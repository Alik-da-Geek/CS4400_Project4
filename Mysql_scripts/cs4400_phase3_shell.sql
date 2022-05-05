-- CS4400: Introduction to Database Systems
-- Bank Management Project - Phase 3 (v2)
-- Generating Stored Procedures & Functions for the Use Cases
-- April 4th, 2022

-- implement these functions and stored procedures on the project database
use bank_management;

-- [1] create_corporation()
-- This stored procedure creates a new corporation
drop procedure if exists create_corporation;
delimiter //
create procedure create_corporation (in ip_corpID varchar(100),
                                     in ip_shortName varchar(100), in ip_longName varchar(100),
                                     in ip_resAssets integer)
begin
    insert into corporation (corpID, shortName, longName, resAssets) values (ip_corpID, ip_shortName, ip_longName, ip_resAssets);
end //
delimiter ;

-- [2] create_bank()
-- This stored procedure creates a new bank that is owned by an existing corporation
-- The corporation must also be managed by a valid employee [being a manager doesn't leave enough time for other jobs]
drop procedure if exists create_bank;
delimiter //
create procedure create_bank (in ip_bankID varchar(100), in ip_bankName varchar(100),
                              in ip_street varchar(100), in ip_city varchar(100), in ip_state char(2),
                              in ip_zip char(5), in ip_resAssets integer, in ip_corpID varchar(100),
                              in ip_manager varchar(100), in ip_bank_employee varchar(100))
begin
    if
        ((select count(*) from workfor where perID = ip_manager) = 0 and				# check if manager work for only one bank
        ((select count(*) from bank where manager = ip_manager) = 0) and
        (select exists (select * from employee where perID = ip_bank_employee)))		# check if the employee exists
    then
        insert into bank (bankID, bankName, street, city, state, zip, resAssets, corpID, manager)
        values (ip_bankID, ip_bankName, ip_street, ip_city, ip_state, ip_zip, ip_resAssets, ip_corpID, ip_manager);
        insert into workfor values (ip_bankID, ip_bank_employee);
    end if;
end //
delimiter ;

-- [3] start_employee_role()
-- If the person exists as an admin or employee then don't change the database state [not allowed to be admin along with any other person-based role]
-- If the person doesn't exist then this stored procedure creates a new employee
-- If the person exists as a customer then the employee data is added to create the joint customer-employee role
drop procedure if exists start_employee_role;
delimiter //
create procedure start_employee_role (in ip_perID varchar(100), in ip_taxID char(11),
                                      in ip_firstName varchar(100), in ip_lastName varchar(100), in ip_birthdate date,
                                      in ip_street varchar(100), in ip_city varchar(100), in ip_state char(2),
                                      in ip_zip char(5), in ip_dtJoined date, in ip_salary integer,
                                      in ip_payments integer, in ip_earned integer, in emp_password  varchar(100))
begin
    -- Implement your code here
    if
        (select exists (select * from person where perID = ip_perID)) 		# check if the person exist first
    then		# if the person does exist
        if
            ((select count(*) from system_admin where perID = ip_perID) = 0 and
                    (select count(*) from employee where perID  = ip_perID) = 0)			# check if the person is a system admin or a current employee
        then		# if not then it must be a customer and we should add in the employee data
            insert into employee values (ip_perID, ip_salary, ip_payments, ip_earned);		# add in the employee data
            update person set pwd = emp_password where perID = ip_perID;					# update customer password to employee password
        end if;
    else		# if the person does not exist
        insert into person values (ip_perID, emp_password);
        insert into bank_user values (ip_perID, ip_taxID, ip_birthdate, ip_firstName, ip_lastName, ip_dtJoined, ip_street, ip_city, ip_state, ip_zip);
        insert into employee values (ip_perID, ip_salary, ip_payments, ip_earned);
    end if;
end //
delimiter ;

-- [4] start_customer_role()
-- If the person exists as an admin or customer then don't change the database state [not allowed to be admin along with any other person-based role]
-- If the person doesn't exist then this stored procedure creates a new customer
-- If the person exists as an employee then the customer data is added to create the joint customer-employee role
drop procedure if exists start_customer_role;
delimiter //
create procedure start_customer_role (in ip_perID varchar(100), in ip_taxID char(11),
                                      in ip_firstName varchar(100), in ip_lastName varchar(100), in ip_birthdate date,
                                      in ip_street varchar(100), in ip_city varchar(100), in ip_state char(2),
                                      in ip_zip char(5), in ip_dtJoined date, in cust_password varchar(100))
begin
    -- Implement your code here
    if
        (select exists (select * from person where perID = ip_perID)) 		# check if the person exist first
    then		# if the person does exist
        if
            ((select count(*) from system_admin where perID = ip_perID) = 0 and
                    (select count(*) from customer where perID  = ip_perID) = 0)			# check if the person is a system admin or a current customer
        then		# if not then it must be a employee and we should add in the customer data
            insert into customer values (ip_perID);											# add in the employee data
            update person set pwd = cust_password where perID = ip_perID;					# update customer password to employee password
        end if;
    else		# if the person does not exist
        insert into person values (ip_perID, cust_password);
        insert into bank_user values (ip_perID, ip_taxID, ip_birthdate, ip_firstName, ip_lastName, ip_dtJoined, ip_street, ip_city, ip_state, ip_zip);
        insert into customer values (ip_perID);
    end if;
end //
delimiter ;

-- [5] stop_employee_role()
-- If the person doesn't exist as an employee then don't change the database state
-- If the employee manages a bank or is the last employee at a bank then don't change the database state [each bank must have a manager and at least one employee]
-- If the person exists in the joint customer-employee role then the employee data must be removed, but the customer information must be maintained
-- If the person exists only as an employee then all related person data must be removed
drop procedure if exists stop_employee_role;
delimiter //
create procedure stop_employee_role (in ip_perID varchar(100))
proc_Exit: begin
    -- Implement your code here
    declare n integer default 0;
    declare m integer default 0;
    
    # If the person doesn't exist as an employee then don't change the database state
    if ((select count(*) from employee where perID = ip_perID) = 0)
    then
        leave proc_Exit;
    end if;

    # If the employee manages a bank then don't change the database state
    if (select exists (select * from bank where manager = ip_perID))
    then
        leave proc_Exit;
    end if;

    # If the employee is the last employee at a bank then don't change the database state
    
    select count(*) from workfor where bankID in (select bankID from workfor where perID = ip_perID) into n;
	select count(*) from (select distinct bankID from workfor where perID = ip_perID) as x into m;
    
    # if ((select count(*) from workfor where bankID = (select bankID from workfor where perID = ip_perID)) = 1)
    if (n < (2 * m))
    then
        leave proc_Exit;
    end if;

    # condition satisfied, perform the deletion
    if (select exists (select * from customer where perID = ip_perID))		# the employee is also a customer
    then
        delete from workfor where perID = ip_perID;			# update the workfor relationship (stop working for a bank)
        delete from employee where perID = ip_perID;		# only delete the employee info
    else			# the employee is not a customer
        delete from workfor where perID = ip_perID;			# update the workfor relationship (stop working for a bank)
        delete from employee where perID = ip_perID;
        delete from bank_user where perID = ip_perID;
        delete from person where perID = ip_perID;
    end if;
end //
delimiter ;

-- [6] stop_customer_role()
-- If the person doesn't exist as an customer then don't change the database state
-- If the customer is the only holder of an account then don't change the database state [each account must have at least one holder]
-- If the person exists in the joint customer-employee role then the customer data must be removed, but the employee information must be maintained
-- If the person exists only as a customer then all related person data must be removed
drop procedure if exists stop_customer_role;
delimiter //
create procedure stop_customer_role (in ip_perID varchar(100))
    proc_Exit: begin
        -- Implement your code here
        declare m int default 0;	# num of accounts owned by the customer
        declare n int default 0;	# num of the total owners of all those accounts

        # If the person doesn't exist as an customer then don't change the database state
        if ((select count(*) from customer where perID = ip_perID) = 0)
        then
            leave proc_Exit;
        end if;

        # If the customer is the only holder of an account then don't change the database state
        if (select exists (select * from access where perID = ip_perID))		# if the customer does own at least one account
        then
            select count(*) from access where perID = ip_perID into m;
            select count(*) from access where (bankID, accountID) in
                  (select bankID, accountID from access where perID = ip_perID) into n;
            if (n < (2 * m))		# if the customer is the sole holder of any of the account
            then
                leave proc_Exit;
            end if;
        end if;

        # condition satisfied, perform the deletion
        if (select exists (select * from employee where perID = ip_perID))
        then		# the person is also an employee
            delete from access where perID = ip_perID;		# delete ownership from the own-account relationship
            delete from customer_contacts where perID = ip_perID;
            delete from customer where perID = ip_perID;	# only delete the customer info
        else		# the person is not also an employee
            delete from access where perID = ip_perID;		# delete ownership from the own-account relationship
            delete from customer_contacts where perID = ip_perID;
            delete from customer where perID = ip_perID;
            delete from bank_user where perID = ip_perID;
            delete from person where perID = ip_perID;
        end if;
end //
delimiter ;

-- [7] hire_worker()
-- If the person is not an employee then don't change the database state
-- If the worker is a manager then then don't change the database state [being a manager doesn't leave enough time for other jobs]
-- Otherwise, the person will now work at the assigned bank in addition to any other previous work assignments
-- Also, adjust the employee's salary appropriately
drop procedure if exists hire_worker;
delimiter //
create procedure hire_worker (in ip_perID varchar(100), in ip_bankID varchar(100),
                              in ip_salary integer)
proc_Exit: begin
    -- Implement your code here
    # If the new person is not an employee then don't change the database state
    if ((select count(*) from employee where perID = ip_perID) = 0)
    then
        leave proc_Exit;
    end if;

    # If the worker is a manager then then don't change the database state
    if (select exists (select * from bank where manager = ip_perID))
    then
        leave proc_Exit;
    end if;

    # conditions satisfied, perform update
    insert into workfor values (ip_bankID, ip_perID);
    update employee set salary = ip_salary where perID = ip_perID;		# add the new salary into the total salary of the employee
end //
delimiter ;

-- [8] replace_manager()
-- If the new person is not an employee then don't change the database state
-- If the new person is a manager or worker at any bank then don't change the database state [being a manager doesn't leave enough time for other jobs]
-- Otherwise, replace the previous manager at that bank with the new person
-- The previous manager's association as manager of that bank must be removed
-- Adjust the employee's salary appropriately
drop procedure if exists replace_manager;
delimiter //
create procedure replace_manager (in ip_perID varchar(100), in ip_bankID varchar(100),
                                  in ip_salary integer)
proc_Exit: begin
    -- Implement your code here

    # If the new person is not an employee then don't change the database state
    if ((select count(*) from employee where perID = ip_perID) = 0)
    then
        leave proc_Exit;
    end if;

    # If the new person is a manager or worker at any bank then don't change the database state
    if ((select exists (select * from bank where manager = ip_perID)) or (select exists (select * from workfor where perID = ip_perID)))
    then
        leave proc_Exit;
    end if;

    # condition satisfied, perform operation
    update bank set manager = ip_perID where bankID = ip_bankID;
    update employee set salary = ip_salary where perID = ip_perID;		# update the salary
end //
delimiter ;

-- [9] add_account_access()
-- If the account does not exist, create a new account. If the account exists, add the customer to the account
-- When creating a new account:
-- If the person opening the account is not an admin then don't change the database state
-- If the intended customer (i.e. ip_customer) is not a customer then don't change the database state
-- Otherwise, create a new account owned by the designated customer
-- The account type will be determined by the enumerated ip_account_type variable
-- ip_account_type in {checking, savings, market}
-- When adding a customer to an account:
-- If the person granting access is not an admin or someone with access to the account then don't change the database state
-- If the intended customer (i.e. ip_customer) is not a customer then don't change the database state
-- Otherwise, add the new customer to the existing account
drop procedure if exists add_account_access;
delimiter //
create procedure add_account_access (in ip_requester varchar(100), in ip_customer varchar(100),
                                     in ip_account_type varchar(10), in ip_bankID varchar(100),
                                     in ip_accountID varchar(100), in ip_balance integer, in ip_interest_rate integer,
                                     in ip_dtDeposit date, in ip_minBalance integer, in ip_numWithdrawals integer,
                                     in ip_maxWithdrawals integer, in ip_dtShareStart date)
proc_Exit: begin
    -- Implement your code here
    if (select exists (select * from bank_account where (bankID, accountID) = (ip_bankID, ip_accountID)))
    then		# the account exists, add the customer to the account
        # If the person granting access is not an admin or someone with access to the account then don't change the database state
        if ((select not exists (select * from system_admin where perID = ip_requester)) and (select not exists (select * from
            (select perID from access where (bankID, accountID) = (ip_bankID, ip_accountID)) as alias where perID = ip_requester)))
        then
            leave proc_Exit;
        end if;

        # If the intended customer (i.e. ip_customer) is not a customer then don't change the database state
        if (select not exists (select * from customer where perID = ip_customer))
        then
            leave proc_Exit;
        end if;

        # condition satisfied, perform operation
        # do we just ignore all the other input parameters when there is an existing account?????
        insert into access values (ip_customer, ip_bankID, ip_accountID, ip_dtShareStart, ip_dtDeposit);

    else		# the account does not exist, create a new account
    # If the person opening the account is not an admin then don't change the database state
        if (select not exists (select * from system_admin where perID = ip_requester))
        then
            leave proc_Exit;
        end if;

        # If the intended customer (i.e. ip_customer) is not a customer then don't change the database state
        if (select not exists (select * from customer where perID = ip_customer))
        then
            leave proc_Exit;
        end if;

        # condition satisfied, perform operation
        insert into bank_account values (ip_bankID, ip_accountID, ip_balance);		# create general account info
        if (ip_account_type = 'checking')
        then
            insert into checking values (ip_bankID, ip_accountID, NULL, NULL, NULL, NULL);
        else
            # insert info for general interest-bearing accounts
            insert into interest_bearing values (ip_bankID, ip_accountID, ip_interest_rate, ip_dtDeposit);
            if (ip_account_type = 'savings')
            then
                insert into savings values (ip_bankID, ip_accountID, ip_minBalance);	# insert info for savings account
            elseif (ip_account_type = 'market')
            then
                insert into market values (ip_bankID, ip_accountID, ip_maxWithdrawals, ip_numWithdrawals);		# insert info for market account
            end if;
        end if;
        insert into access values (ip_customer, ip_bankID, ip_accountID, ip_dtShareStart, ip_dtDeposit);
    end if;
end //
delimiter ;

-- [10] remove_account_access()
-- Remove a customer's account access. If they are the last customer with access to the account, close the account
-- When just revoking access:
-- If the person revoking access is not an admin or someone with access to the account then don't change the database state
-- Otherwise, remove the designated sharer from the existing account
-- When closing the account:
-- If the customer to be removed from the account is NOT the last remaining owner/sharer then don't close the account
-- If the person closing the account is not an admin or someone with access to the account then don't change the database state
-- Otherwise, the account must be closed
drop procedure if exists remove_account_access;
delimiter //
create procedure remove_account_access (in ip_requester varchar(100), in ip_sharer varchar(100),
                                        in ip_bankID varchar(100), in ip_accountID varchar(100))
    proc_Exit: begin
        -- Implement your code here
        declare num_owners integer default 0;
        select count(perID) from access where (bankID, accountID) = (ip_bankID, ip_accountID) into num_owners;

        if (num_owners > 1)
        then		# The customer is not the last person with access to the account -> just revoking access
        # If the person revoking access is not an admin or someone with access to the account then don't change the database state
            if ((select count(perID) from system_admin where perID = ip_requester) = 0 and ((select count(*) from
                    (select perID from access where (bankID, accountID) = (ip_bankID, ip_accountID)) as apI where perID = ip_requester) = 0))
            then
                leave proc_Exit;
            end if;

            # Otherwise, remove the designated sharer from the existing account
            delete from access where (perID, bankID, accountID) = (ip_sharer, ip_bankID, ip_accountID);
        elseif (num_owners = 1)
        then		# If they are the last customer with access to the account, close the account
            if ((select count(perID) from system_admin where perID = ip_requester) = 0 and ((select count(*) from
                (select perID from access where (bankID, accountID) = (ip_bankID, ip_accountID)) as a where perID = ip_requester) = 0))
            then
                leave proc_Exit;
            end if;

            # Otherwise, the account must be closed
            delete from access where (bankID, accountID) = (ip_bankID, ip_accountID);
            delete from checking where (bankID, accountID) = (ip_bankID, ip_accountID);
            delete from savings where (bankID, accountID) = (ip_bankID, ip_accountID);
            delete from market where (bankID, accountID) = (ip_bankID, ip_accountID);
            delete from interest_bearing_fees where (bankID, accountID) = (ip_bankID, ip_accountID);
            delete from interest_bearing where (bankID, accountID) = (ip_bankID, ip_accountID);
            delete from bank_account where (bankID, accountID) = (ip_bankID, ip_accountID);
        else
            leave proc_Exit;		# do nothing if the account does not exist
        end if;
end //
delimiter ;

-- [11] create_fee()
drop procedure if exists create_fee;
delimiter //
create procedure create_fee (in ip_bankID varchar(100), in ip_accountID varchar(100),
                             in ip_fee_type varchar(100))
begin
    -- Implement your code here
    insert into interest_bearing_fees values (ip_bankID, ip_accountID, ip_fee_type);
end //
delimiter ;

-- [12] start_overdraft()
drop procedure if exists start_overdraft;
delimiter //
create procedure start_overdraft (in ip_requester varchar(100),
                                  in ip_checking_bankID varchar(100), in ip_checking_accountID varchar(100),
                                  in ip_savings_bankID varchar(100), in ip_savings_accountID varchar(100))
proc_Exit: begin
    -- Implement your code here
    # If the requester is not a system admin or owner of the checking and the savings account, do nothing
    if (((select count(*) from
             (select perID from access where (bankID, accountID) = (ip_checking_bankID, ip_checking_accountID))
                 as checking_account_owners where perID = ip_requester) = 0 or
       (select exists (select * from
            (select perID from access where (bankID, accountID) = (ip_savings_bankID, ip_savings_accountID))
                as saving_account_owners where perID = ip_requester) = 0))
        and ((select count(perID) from system_admin where perID = ip_requester) = 0))
    then
        leave proc_Exit;
    end if;
    
    # and (select protectionAccount from checking where bankID = ip_checking_bankID and accountID = ip_checking_accountID) != NULL
    
    # if the checking account already has overdraft protection
    if ((select protectionBank from checking where bankID = ip_checking_bankID and accountID = ip_checking_accountID) is not NULL)
	then	# do nothing
		leave proc_Exit;
    end if;
    
    # if the protection account is already protecting another checking account
    if (select exists (select protectionBank, protectionAccount from checking where protectionBank = ip_savings_bankID and protectionAccount = ip_savings_accountID))
    then	# do nothing
		leave proc_Exit;
    end if;

    # condition satisfied, perform operation
    update checking set protectionBank = ip_savings_bankID, protectionAccount = ip_savings_accountID where (bankID, accountID) = (ip_checking_bankID, ip_checking_accountID);
end //
delimiter ;

-- [13] stop_overdraft()
drop procedure if exists stop_overdraft;
delimiter //
create procedure stop_overdraft (in ip_requester varchar(100),
                                 in ip_checking_bankID varchar(100), in ip_checking_accountID varchar(100))
proc_Exit: begin
    -- Implement your code here

    # If the requester is not a system admin or owner of the checking, do nothing
    if ((select count(*) from
        (select perID from access where (bankID, accountID) = (ip_checking_bankID, ip_checking_accountID)) as checking_account_owners_2
        where perID = ip_requester) = 0)
    then
        if (select not exists (select perID from system_admin where perID = ip_requester))
        then
            leave proc_Exit;
        end if;
    end if;

    # condition satisfied, perform operation
    update checking set protectionBank = NULL, protectionAccount = NULL where (bankID, accountID) = (ip_checking_bankID, ip_checking_accountID);
end //
delimiter ;

-- [14] account_deposit()
-- If the person making the deposit does not have access to the account then don't change the database state
-- Otherwise, the account balance and related info must be modified appropriately
drop procedure if exists account_deposit;
delimiter //
create procedure account_deposit (in ip_requester varchar(100), in ip_deposit_amount integer,
                                  in ip_bankID varchar(100), in ip_accountID varchar(100), in ip_dtAction date)
proc_Exit: begin
    -- Implement your code here
    # If the account does not exist, don't change the database state
    if ((select count(*) from bank_account where (bankID, accountID) = (ip_bankID, ip_accountID)) = 0)
    then
        leave proc_Exit;
    end if;

    # If the person making the deposit does not have access to the account then don't change the database state
    if ((select count(*) from
           (select perID from access where (bankID, accountID) = (ip_bankID, ip_accountID)) as account_owners_3 where perID = ip_requester) = 0)
    then
        leave proc_Exit;
    end if;

    # update account info (balance)
    update bank_account set balance = balance + ip_deposit_amount where (bankID, accountID) = (ip_bankID, ip_accountID);
    update access set dtAction = ip_dtAction where (perID, bankID, accountID) = (ip_requester, ip_bankID, ip_accountID);

    if (select exists (select * from interest_bearing where (bankID, accountID) = (ip_bankID, ip_accountID)))
    then	# the account is an interest bearing account
        update interest_bearing set dtDeposit = ip_dtAction where (bankID, accountID) = (ip_bankID, ip_accountID);
    end if;
end //
delimiter ;

-- [15] account_withdrawal()
-- If the person making the withdrawal does not have access to the account then don't change the database state
-- If the withdrawal amount is more than the account balance for a savings or market account then don't change the database state [the account balance must be positive]
-- If the withdrawal amount is more than the account balance + the overdraft balance (i.e., from the designated savings account) for a checking account then don't change the database state [the account balance must be positive]
-- Otherwise, the account balance and related info must be modified appropriately (amount deducted from the primary account first, and second from the overdraft account as needed)
drop procedure if exists account_withdrawal;
delimiter //
create procedure account_withdrawal (in ip_requester varchar(100), in ip_withdrawal_amount integer,
                                     in ip_bankID varchar(100), in ip_accountID varchar(100), in ip_dtAction date)
proc_Exit: begin
    -- Implement your code here
    declare checking_balance integer default 0;
    declare overdraft_balance integer default 0;
    declare protection_bank varchar(100) default '';
    declare protection_account varchar(100) default '';

    # If the account does not exist, don't change the database state
    if (select exists (select * from bank_account where (bankID, accountID) = (ip_bankID, ip_accountID)) = 0)
    then
        leave proc_Exit;
    end if;

    # If the person making the deposit does not have access to the account then don't change the database state
    

    # Perform operation for different type of account
    if (select exists (select * from interest_bearing where (bankID, accountID) = (ip_bankID, ip_accountID)))
    then		# the account is a saving or market account
    # If the withdrawal amount is more than the account balance for a savings or market account then don't change the database state
        if (ip_withdrawal_amount > (select balance from bank_account where (bankID, accountID) = (ip_bankID, ip_accountID)))
        then
            leave proc_Exit;
        else		# the withdrawal amount is less than the account balance
            update bank_account set balance = balance - ip_withdrawal_amount where (bankID, accountID) = (ip_bankID, ip_accountID);
            if (select exists (select * from market where (bankID, accountID) = (ip_bankID, ip_accountID)))
            then
                update market set numWithdrawals = numWithdrawals + 1 where (bankID, accountID) = (ip_bankID, ip_accountID);
            end if;
        end if;
    elseif (select exists (select * from checking where (bankID, accountID) = (ip_bankID, ip_accountID)))
    then		# the account is a checking account
        if ((select protectionBank from checking where (bankID, accountID) = (ip_bankID, ip_accountID)) is NULL)
        then		# the checking account does not have overdraft protection
            if (ip_withdrawal_amount <= checking_balance)
            then		# withdrawal amount is less or equal to the balance in the checking account
                update bank_account set balance = balance - ip_withdrawal_amount where (bankID, accountID) = (ip_bankID, ip_accountID);
            else		# withdrawal amount is more than the balance in the checking account, do nothing (since there's not overdraft protection)
                leave proc_Exit;
            end if;
        else		# the checking account has overdraft protection
            select balance from bank_account where (bankID, accountID) = (ip_bankID, ip_accountID) into checking_balance;
            select protectionAccount from checking where (bankID, accountID) = (ip_bankID, ip_accountID) into protection_account;
            select protectionBank from checking where (bankID, accountID) = (ip_bankID, ip_accountID) into protection_bank;
            select balance from bank_account where (bankID, accountID) = (protection_bank, protection_account) into overdraft_balance;
            # If the withdrawal amount is more than the account balance + the overdraft balance for a checking account then don't change the database state
            if (ip_withdrawal_amount > checking_balance + overdraft_balance)
            then	# the withdrawal amount exceeds the overdraft balance
                leave proc_Exit;
            else
                if (ip_withdrawal_amount <= checking_balance)
                then		# withdrawal amount is less or equal to the balance in the checking account
                    update bank_account set balance = balance - ip_withdrawal_amount where (bankID, accountID) = (ip_bankID, ip_accountID);
                else		# withdrawal amount is more than the balance in the checking account, activate the overdraft protection
                    update bank_account set balance = 0 where (bankID, accountID) = (ip_bankID, ip_accountID);		# update balance in checking account
                    update bank_account set balance = balance - (ip_withdrawal_amount - checking_balance) where (bankID, accountID) = (select protectionBank, protectionAccount from checking where (bankID, accountID) = (ip_bankID, ip_accountID));	# update balance in the respective protection account
                    update checking set dtOverdraft = ip_dtAction where (bankID, accountID) = (ip_bankID, ip_accountID);
                    update checking set amount = (ip_withdrawal_amount - checking_balance) where (bankID, accountID) = (ip_bankID, ip_accountID);
                    update access set dtAction = ip_dtAction where (bankID, accountID, perID) = (ip_bankID, ip_accountID, ip_requester);
                    update access set dtAction = ip_dtAction where (bankID, accountID) = (select protectionBank, protectionAccount from checking where (bankID, accountID) = (ip_bankID, ip_accountID)) and perID = ip_requester;
                    end if;
            end if;
        end if;
    else	# the account is neither checking or interest-bearing
        leave proc_Exit;
    end if;

    # update last transaction date for the customer
    update access set dtAction = ip_dtAction where (perID, bankID, accountID) = (ip_requester, ip_bankID, ip_accountID);
end //
delimiter ;

-- [16-1] update_to_account_balance()
-- Helper procedure for procedure [16]
-- update the 'to' account balance during an account transfer
drop procedure if exists update_to_account_balance;
delimiter //
create procedure update_to_account_balance (in ip_to_bankID varchar(100), in ip_to_accountID varchar(100), in ip_transfer_amount integer)
begin
    -- Implement your code here
    # update 'to' account balance
    if ((select balance from bank_account where (bankID, accountID) = (ip_to_bankID, ip_to_accountID)) is NULL)
    then
        update bank_account set balance = ip_transfer_amount where (bankID, accountID) = (ip_to_bankID, ip_to_accountID);	# handling the balance 'NULL' situation
    else
        update bank_account set balance = balance + ip_transfer_amount where (bankID, accountID) = (ip_to_bankID, ip_to_accountID);
    end if;
end //
delimiter ;

-- [16] account_transfer()
-- If the person making the transfer does not have access to both accounts then don't change the database state
-- If the withdrawal amount is more than the account balance for a savings or market account then don't change the database state [the account balance must be positive]
-- If the withdrawal amount is more than the account balance + the overdraft balance (i.e., from the designated savings account) for a checking account then don't change the database state [the account balance must be positive]
-- Otherwise, the account balance and related info must be modified appropriately (amount deducted from the withdrawal account first, and second from the overdraft account as needed, and then added to the deposit account)
drop procedure if exists account_transfer;
delimiter //
create procedure account_transfer (in ip_requester varchar(100), in ip_transfer_amount integer,
                                   in ip_from_bankID varchar(100), in ip_from_accountID varchar(100),
                                   in ip_to_bankID varchar(100), in ip_to_accountID varchar(100), in ip_dtAction date)
proc_Exit: begin
    -- Implement your code here
    declare from_checking_balance integer default 0;
    declare from_overdraft_balance integer default 0;

    # If the accounts do not exist, don't change the database state
    if ((select not exists (select * from bank_account where (bankID, accountID) = (ip_from_bankID, ip_from_accountID))) or
               (select not exists (select * from bank_account where (bankID, accountID) = (ip_to_bankID, ip_to_accountID))))
    then
        leave proc_Exit;
    end if;

    # If the person making the deposit does not have access to the both accounts then don't change the database state
    if ((select not exists (select perID from access where (bankID, accountID) = (ip_from_bankID, ip_from_accountID) and perID = ip_requester)) or
        (select not exists (select perID from access where (bankID, accountID) = (ip_to_bankID, ip_to_accountID) and perID = ip_requester)))
    then
        leave proc_Exit;
    end if;

    # Perform operation for different type of account
    if (select exists (select * from interest_bearing where (bankID, accountID) = (ip_from_bankID, ip_from_accountID)))
    then		# the 'from' account is a saving or market account
    # If the transfer amount is more than the account balance for a savings or market account then don't change the database state
        if (ip_transfer_amount > (select balance from bank_account where (bankID, accountID) = (ip_from_bankID, ip_from_accountID)))
        then
            leave proc_Exit;
        else		# the withdrawal amount is less than the account balance
            update bank_account set balance = balance - ip_transfer_amount where (bankID, accountID) = (ip_from_bankID, ip_from_accountID);		# update from account balance
            call update_to_account_balance(ip_to_bankID, ip_to_accountID, ip_transfer_amount);		# update 'to' account balance
        end if;
    elseif (select exists (select * from checking where (bankID, accountID) = (ip_from_bankID, ip_from_accountID)))
    then		# the 'from' account is a checking account
        if ((select protectionBank from checking where (bankID, accountID) = (ip_from_bankID, ip_from_accountID)) is NULL)
        then		# the 'from' checking account does not have overdraft protection
            select balance from bank_account where (bankID, accountID) = (ip_from_bankID, ip_from_accountID) into from_checking_balance;
            if (ip_transfer_amount <= from_checking_balance)
            then		# withdrawal amount is less or equal to the balance in the checking account
                update bank_account set balance = balance - ip_transfer_amount where (bankID, accountID) = (ip_from_bankID, ip_from_accountID);
                call update_to_account_balance(ip_to_bankID, ip_to_accountID, ip_transfer_amount);		# update 'to' account balance
            else		# withdrawal amount is more than the balance in the checking account, do nothing (since there's not overdraft protection)
                leave proc_Exit;
            end if;
        else		# the 'from' checking account has overdraft protection
            select balance from bank_account where (bankID, accountID) = (ip_from_bankID, ip_from_accountID) into from_checking_balance;
            select balance from bank_account where (bankID, accountID) = (select protectionBank, protectionAccount from checking where (bankID, accountID) = (ip_from_bankID, ip_from_accountID)) into from_overdraft_balance;
            # If the withdrawal amount is more than the account balance + the overdraft balance for a checking account then don't change the database state
            if (ip_transfer_amount > from_checking_balance + from_overdraft_balance)
            then	# the withdrawal amount exceeds the overdraft balance
                leave proc_Exit;
            else	# the wthdrawal amount is less or equal to 'from' checking account balance + overdraft balance
                if (ip_transfer_amount <= from_checking_balance)
                then		# withdrawal amount is less or equal to the balance in the checking account
                    update bank_account set balance = balance - ip_transfer_amount where (bankID, accountID) = (ip_from_bankID, ip_from_accountID);
                else		# withdrawal amount is more than the balance in the checking account, activate the overdraft protection
                    update bank_account set balance = 0 where (bankID, accountID) = (ip_from_bankID, ip_from_accountID);		# update balance in checking account
                    update bank_account set balance = balance - (ip_transfer_amount - from_checking_balance) where (bankID, accountID) = (select protectionBank, protectionAccount from checking where (bankID, accountID) = (ip_from_bankID, ip_from_accountID));	# update balance in the respective protection account
                end if;
                call update_to_account_balance(ip_to_bankID, ip_to_accountID, ip_transfer_amount);		# update 'to' account balance
            end if;
        end if;
    else	# the account is neither checking or interest-bearing
        leave proc_Exit;
    end if;

    # update last transaction date for the customer
    update access set dtAction = ip_dtAction where (perID, bankID, accountID) = (ip_requester, ip_from_bankID, ip_from_accountID);		# update 'from' account last transaction date
    update access set dtAction = ip_dtAction where (perID, bankID, accountID) = (ip_requester, ip_to_bankID, ip_to_accountID);			# update 'to' account last transaction date
end //
delimiter ;

-- [17] pay_employees()
-- Increase each employee's pay earned so far by the monthly salary
-- Deduct the employee's pay from the banks reserved assets
-- If an employee works at more than one bank, then deduct the (evenly divided) monthly pay from each of the affected bank's reserved assets
-- Truncate any fractional results to an integer before further calculations
drop procedure if exists pay_employees;
delimiter //
create procedure pay_employees ()
begin
    -- Implement your code here
    declare employee_ID varchar(100) default '';
    declare num_of_employers integer default 0;
    declare employee_salary integer default 0;
    declare reserved_assets_deduction integer default 0;
    declare n int default 0;
    declare i int default 0;
    select count(*) from employee into n;
    set i = 0;
    while i < n do		# iterate through each employee in the employee table
        select perID from employee limit i, 1 into employee_ID;		# extract the ith employee perID
        select count(*) from workfor where perID = employee_ID into num_of_employers;		# count the number of banks this employee works for
        select COALESCE(salary, 0) from employee where perID = employee_ID into employee_salary;			# extract employee's monthly salary

         update employee set payments = COALESCE(payments, 0) + 1 where perID = employee_ID;

        if (num_of_employers = 0)
        then
            select count(*) from bank where manager = employee_ID into num_of_employers;
        end if;
        if (num_of_employers = 0)
        then
            select count(*) from system_admin where system_admin.perID = employee_ID into num_of_employers;
        end if;
        if (num_of_employers != 0)
        then
            set reserved_assets_deduction = employee_salary div num_of_employers;

            update employee set earned = earned + COALESCE(employee_salary, 0) where perID = employee_ID;

            update bank set resAssets = COALESCE(resAssets, 0) - reserved_assets_deduction where bankID in (select bankID from workFor where perID = employee_ID);
        end if;
        set i = i + 1;
    end while;
end //
delimiter ;

-- [18-1] penalize_savings_account()
-- helper procedure for procedure 18
-- penalize individual savings account according to the minimum balance and add the fine to the owning bank's reserved assets
drop procedure if exists penalize_savings_account;
delimiter //
create procedure penalize_savings_account (in ip_bankID varchar(100), in ip_accountID varchar(100))
proc_Exit: begin
    declare ten_percent_savings integer default 0;		# 10% of the account balance, use for comparison
    declare min_bal integer default 0;					# minimum balance of that saving account
    declare curr_bal integer default 0;					# current balance of that saving account

    # If the account does not exist, don't change the database state
    if ((select count(*) from savings where (bankID, accountID) = (ip_bankID, ip_accountID)) = 0)
    then
        leave proc_Exit;
    end if;

    select minBalance from savings where (bankID, accountID) = (ip_bankID, ip_accountID) into min_bal;			# extract the minimum balance
    select balance from bank_account where (bankID, accountID) = (ip_bankID, ip_accountID) into curr_bal;		# extract the current balance
    set ten_percent_savings = curr_bal div 10;		# compute 10% of the current balance, truncate to integer value
    if (curr_bal < min_bal)
    then	# current balance is below the minimum balance, account need to be penalized
        if (ten_percent_savings < 100)
        then	# the smaller amount is 10% of the current balance
            update bank_account set balance = balance - ten_percent_savings where (bankID, accountID) = (ip_bankID, ip_accountID);	# deduct penalty
            if ((select resAssets from bank where bankID = ip_bankID) is NULL)
            then	# the bank has a NULL reserved assets
                update bank set resAssets = ten_percent_savings where bankID = ip_bankID;					# if the bank has a NULL reserved assets just set it as the fine collected
            else	# the bank has a pre-existing reserved assets value
                update bank set resAssets = resAssets + ten_percent_savings where bankID = ip_bankID;		# add in the reserved assets for the owning bank if not null
            end if;
        else	# the smaller amount is $100
            update bank_account set balance = balance - 100 where (bankID, accountID) = (ip_bankID, ip_accountID);	# deduct penalty
            if ((select resAssets from bank where bankID = ip_bankID) is NULL)
            then	# the bank has a NULL reserved assets
                update bank set resAssets = 100 where bankID = ip_bankID;					# if the bank has a NULL reserved assets just set it as the fine collected
            else	# the bank has a pre-existing reserved assets value
                update bank set resAssets = resAssets + 100 where bankID = ip_bankID;		# add in the reserved assets for the owning bank if not null
            end if;
        end if;
    end if;
end //
delimiter ;

-- [18-2] penalize_market_account()
-- helper procedure for procedure 18
-- penalize individual market account according to the maximum withdrawal limit and add the fine to the owning bank's reserved assets
drop procedure if exists penalize_market_account;
delimiter //
create procedure penalize_market_account (in ip_bankID varchar(100), in ip_accountID varchar(100))
proc_Exit: begin
    declare twenty_percent_market integer default 0;		# 10% of the account balance, use for comparison
    declare curr_bal integer default 0;						# current balance of the account
    declare max_withdrawal integer default 0;				# max number of withdrawal of that market account
    declare total_withdrawal integer default 0;				# total number of withdrawal of that saving account

    # If the account does not exist, don't change the database state
    if ((select count(*) from market where (bankID, accountID) = (ip_bankID, ip_accountID)) = 0)
    then
        leave proc_Exit;
    end if;

    select balance from bank_account where (bankID, accountID) = (ip_bankID, ip_accountID) into curr_bal;					# extract the current balance
    select maxWithdrawals from market where (bankID, accountID) = (ip_bankID, ip_accountID) into max_withdrawal;			# extract the maxmimum number of withdrawal
    select numWithdrawals from market where (bankID, accountID) = (ip_bankID, ip_accountID) into total_withdrawal;			# extract the total number of withdrawal
    set twenty_percent_market = curr_bal div 5;		# compute 20% of the current balance, truncate to integer value
    if (total_withdrawal > total_withdrawal)
    then	# current balance is below the minimum balance, account need to be penalized
        if (twenty_percent_market < 500 * (total_withdrawal - total_withdrawal))
        then	# the smaller amount is 20% of the current balance
        #  Do we need to handle the situation if the balance goes below 0?????
            update bank_account set balance = balance - twenty_percent_market where (bankID, accountID) = (ip_bankID, ip_accountID);	# deduct penalty
            if ((select resAssets from bank where bankID = ip_bankID) is NULL)
            then	# the bank has a NULL reserved assets
                update bank set resAssets = twenty_percent_market where bankID = ip_bankID;					# if the bank has a NULL reserved assets just set it as the fine collected
            else	# the bank has a pre-existing reserved assets value
                update bank set resAssets = resAssets + twenty_percent_market where bankID = ip_bankID;		# add in the reserved assets for the owning bank if not null
            end if;
        else	# the smaller amount is $500 * (numWithdrawals - maxWithdrawals)
        #  Do we need to handle the situation if the balance goes below 0?????
            update bank_account set balance = balance - 500 * (total_withdrawal - max_withdrawal) where (bankID, accountID) = (ip_bankID, ip_accountID);	# deduct penalty
            if ((select resAssets from bank where bankID = ip_bankID) is NULL)
            then	# the bank has a NULL reserved assets
                update bank set resAssets = 500 * (total_withdrawal - max_withdrawal) where bankID = ip_bankID;					# if the bank has a NULL reserved assets just set it as the fine collected
            else	# the bank has a pre-existing reserved assets value
                update bank set resAssets = resAssets + 500 * (total_withdrawal - max_withdrawal) where bankID = ip_bankID;		# add in the reserved assets for the owning bank if not null
            end if;
        end if;
    end if;
end //
delimiter ;

-- [18] penalize_accounts()
-- For each savings account that is below the minimum balance, deduct the smaller of $100 or 10% of the current balance from the account
-- For each market account that has exceeded the maximum number of withdrawals, deduct the smaller of $500 per excess withdrawal or 20% of the current balance from the account
-- Add all deducted amounts to the reserved assets of the bank that owns the account
-- Truncate any fractional results to an integer before further calculations
drop procedure if exists penalize_accounts;
delimiter //
create procedure penalize_accounts ()
begin
    -- Implement your code here
    declare bank_ID varchar(100) default NULL;
    declare account_ID varchar(100) default NULL;
    declare n int default 0;
    declare i int default 0;
    select count(*) from interest_bearing into n;
    set i = 0;
    update bank set resAssets = 0 where resAssets is null;
    # iterate through each row (account) in the interest bearing accounts table
    while i < n do
            select bankID from interest_bearing limit i, 1 into bank_ID;			# extract ith bank ID
            select accountID from interest_bearing limit i, 1 into account_ID;		# extract ith account ID
            # Perform different operations for different types of accounts
            if (select exists (select * from savings where (bankID, accountID) = (bank_ID, account_ID)))
            then	# the account is a savings account
                call penalize_savings_account(bank_ID, account_ID);
            else	# the account is a market account
                call penalize_market_account(bank_ID, account_ID);
            end if;
            set i = i + 1;
        end while;
end //
delimiter ;

-- [19-1] accrue_interest_savings()
-- helper procedure for procedure 19
-- For the savings account that is "in good standing", increase the balance based on the designated interest rate
-- A savings account is "in good standing" if the current balance is equal to or above the designated minimum balance
drop procedure if exists accrue_interest_savings;
delimiter //
create procedure accrue_interest_savings (in ip_bankID varchar(100), in ip_accountID varchar(100))
proc_Exit: begin
    -- Implement your code here
    declare min_bal integer default 0;					# minimum balance of that saving account
    declare curr_bal integer default 0;					# current balance of that saving account
    declare inter_rate integer default 0;				# interest rate of the account
    declare moneyChange integer default 0;

    # If the account does not exist or the interest rate is NULL, don't change the database state
    if ((select count(*) from savings where (bankID, accountID) = (ip_bankID, ip_accountID)) = 0 or
               (select inter_rate from savings where (bankID, accountID) = (ip_bankID, ip_accountID)) is NULL)
    then
        leave proc_Exit;
    end if;

    select minBalance from savings where (bankID, accountID) = (ip_bankID, ip_accountID) into min_bal;					# extract the minimum balance
    select balance from bank_account where (bankID, accountID) = (ip_bankID, ip_accountID) into curr_bal;				# extract the current balance
    select interest_rate from interest_bearing where (bankID, accountID) = (ip_bankID, ip_accountID) into inter_rate;	# extract the interest rate
    set moneyChange = curr_bal * COALESCE(inter_rate, 0) div 100;

    if (curr_bal >= min_bal)
    then	# current balance is over the minimum balance, account is in good standing
        if ((select balance from bank_account where (bankID, accountID) = (ip_bankID, ip_accountID)) is not NULL)
        then		# the bank account balance is not NULL
            update bank_account set balance = curr_bal + moneyChange where (bankID, accountID) = (ip_bankID, ip_accountID);		# accrue interest
            # Do we need to account for the situation where the bank has a NULL reserved assets????
            if (moneyChange is NULL)
            then
                update bank set resAssets = COALESCE(resAssets, 0) where bankID = ip_bankID;		# deduct from the bank's reserved assets
            elseif ((select resAssets from bank where bankID = ip_bankID) is NULL )
            then
                update bank set resAssets = 0 - moneyChange where bankID = ip_bankID;
            else
                update bank set resAssets = resAssets - curr_bal * COALESCE(inter_rate, 0) div 100 where bankID = ip_bankID;
            end if;
        end if;
    end if;
end //
delimiter ;

-- [19-2] accrue_interest_market()
-- helper procedure for procedure 19
-- For the market account that is "in good standing", increase the balance based on the designated interest rate
-- A market account is "in good standing" if the current number of withdrawals is less than or equal to the maximum number of allowed withdrawals
drop procedure if exists accrue_interest_market;
delimiter //
create procedure accrue_interest_market (in ip_bankID varchar(100), in ip_accountID varchar(100))
proc_Exit: begin
    -- Implement your code here
    declare max_withdrawal integer default 0;			# max number of withdrawal of that market account
    declare total_withdrawal integer default 0;			# total number of withdrawal of that market account
    declare curr_bal integer default 0;					# current balance of that market account
    declare inter_rate integer default 0;				# interest rate of the account
    declare moneyChange integer default 0;

    # If the account does not exist or the interest rate is NULL, don't change the database state
    if ((select not exists (select * from market where (bankID, accountID) = (ip_bankID, ip_accountID))) or
               ((select interest_rate from interest_bearing where (bankID, accountID) = (ip_bankID, ip_accountID)) is NULL))
    then
        leave proc_Exit;
    end if;

    select COALESCE(maxWithdrawals, 0) from market where (bankID, accountID) = (ip_bankID, ip_accountID) into max_withdrawal;		# extract the max number of withdrawal
    select COALESCE(numWithdrawals, 0) from market where (bankID, accountID) = (ip_bankID, ip_accountID) into total_withdrawal;		# extract the total number of withdrawal
    select balance from bank_account where (bankID, accountID) = (ip_bankID, ip_accountID) into curr_bal;				# extract the current balance
    select interest_rate from interest_bearing where (bankID, accountID) = (ip_bankID, ip_accountID) into inter_rate;	# extract the interest rate
    set moneyChange = curr_bal * COALESCE(inter_rate, 0) div 100;

    if (total_withdrawal <= max_withdrawal)
    then	# total number of withdrawals is not over the max number of withdrawals, account is in good standing
        if ((select balance from bank_account where (bankID, accountID) = (ip_bankID, ip_accountID)) is not NULL)
        then		# the bank account balance is not NULL
            update bank_account set balance = curr_bal + curr_bal * COALESCE(inter_rate, 0) div 100 where (bankID, accountID) = (ip_bankID, ip_accountID);		# accrue interest
            # Do we need to account for the situation where the bank has a NULL reserved assets????
            if (moneyChange is NULL)
            then
                update bank set resAssets = COALESCE(resAssets, 0) where bankID = ip_bankID;		# deduct from the bank's reserved assets
            elseif ((select resAssets from bank where bankID = ip_bankID) is NULL )
            then
                update bank set resAssets = 0 - moneyChange where bankID = ip_bankID;
            else
                update bank set resAssets = resAssets - curr_bal * inter_rate div 100 where bankID = ip_bankID;
            end if;
        end if;
    end if;
end //
delimiter ;

-- [19] accrue_interest()
-- For each interest-bearing account that is "in good standing", increase the balance based on the designated interest rate
-- A savings account is "in good standing" if the current balance is equal to or above the designated minimum balance
-- A market account is "in good standing" if the current number of withdrawals is less than or equal to the maximum number of allowed withdrawals
-- Subtract all paid amounts from the reserved assets of the bank that owns the account
-- Truncate any fractional results to an integer before further calculations
drop procedure if exists accrue_interest;
delimiter //
create procedure accrue_interest ()
proc_Exit: begin
    -- Implement your code here
    declare bank_ID varchar(100) default NULL;
    declare account_ID varchar(100) default NULL;
    declare n int default 0;
    declare i int default 0;
    select count(*) from interest_bearing into n;
    set i = 0;

    update bank set resAssets = 0 where resAssets IS NULL;

    # iterate through each row (account) in the interest bearing accounts table
    while i < n do
            select bankID from interest_bearing limit i, 1 into bank_ID;			# extract ith bank ID
            select accountID from interest_bearing limit i, 1 into account_ID;		# extract ith account ID
            # Perform different operations for different types of accounts
            if (select exists (select * from savings where (bankID, accountID) = (bank_ID, account_ID)))
            then	# the account is a savings account
                call accrue_interest_savings(bank_ID, account_ID);
            else	# the account is a market account
                call accrue_interest_market(bank_ID, account_ID);
            end if;
            set i = i + 1;
        end while;
end //
delimiter ;

-- [20] display_account_stats()
-- Display the simple and derived attributes for each account, along with the owning bank
create or replace view display_account_stats as
select b.bankName as 'name_of_bank',
       ba.accountID as 'account_identifier',
       ba.balance as 'account_assets',
       count(a.perID) as 'account_owners'
from bank_account ba
left join bank b
on ba.bankID = b.bankID
left join access a
on ba.bankID = a.bankID and ba.accountID = a.accountID
group by ba.accountID, ba.bankID;
-- Uncomment above line and implement your code here

-- [21] display_bank_stats()
-- Display the simple and derived attributes for each bank, along with the owning corporation
create or replace view display_bank_stats as
select b.bankID as 'bank_identifier',
       c.shortName as 'name_of_corporation',
       b.bankName as 'name_of_bank',
       b.street as 'street',
       b.city as 'city',
       b.state as 'state',
       b.zip as 'zip',
       NULLIF(count(ba.accountID), 0) as 'number_of_accounts',
       b.resAssets as 'bank_assets',
       (COALESCE(b.resAssets, 0) + COALESCE(SUM(ba.balance), 0)) as 'total_assets'
from bank b
left join corporation c
on b.corpID = c.corpID
left join bank_account ba
on b.bankID = ba.bankID
group by b.bankID;
-- Uncomment above line and implement your code here

-- [22] display_corporation_stats()
-- Display the simple and derived attributes for each corporation
create or replace view display_corporation_stats as
select c.corpID as 'corporation_identifier',
       c.shortName as 'short_name',
       c.longName as 'formal_name',
       NULLIF(count(b.bankID), 0) as 'number_of_banks',
       c.resAssets as 'corporation_assets',
       NULLIF((COALESCE(c.resAssets, 0) + COALESCE(SUM(bs.total_assets), 0)), 0) as 'total_assets'
from corporation c
left join bank b
on c.corpID = b.corpID
left join display_bank_stats bs
on bs.bank_identifier = b.bankID
group by c.corpID;
-- Uncomment above line and implement your code here

-- [23] display_customer_stats()
-- Display the simple and derived attributes for each customer
create or replace view display_customer_stats as
select c.perID as 'person_identifier',
       bu.taxID as 'tax_identifier',
       CONCAT(bu.firstName, ' ', bu.lastName) as 'customer_name',
       bu.birthdate as 'date_of_birth',
       bu.dtJoined as 'joined_system',
       bu.street as "street",
       bu.city as 'city',
       bu.state as 'state',
       bu.zip as 'zip',
       NULLIF(count(a.accountID), 0) as 'number_of_accounts',
       COALESCE(SUM(ba.balance), 0) as 'customer_assets'
from customer c
left join bank_user bu
on c.perID = bu.perID
left join access a
on c.perID = a.perID
left join bank_account ba
on a.bankID = ba.bankID and a.accountID = ba.accountID
group by c.perID;
-- Uncomment above line and implement your code here

-- [24] display_employee_stats()
-- Display the simple and derived attributes for each employee
create or replace view display_employee_stats as
select e.perID as 'person_identifier',
       bu.taxID as 'tax_identifier',
       CONCAT(bu.firstName, ' ', bu.lastName) as 'employee_name',
       bu.birthdate as 'date_of_birth',
       bu.dtJoined as 'joined_system',
       bu.street as "street",
       bu.city as 'city',
       bu.state as 'state',
       bu.zip as 'zip',
       NULLIF(count(wf.bankID), 0) as 'number_of_banks',
       SUM(bs.total_assets) as 'bank_assets'
from employee e
left join bank_user bu
on e.perID = bu.perID
left join workFor wF
on e.perID = wF.perID
left join display_bank_stats bs
on wF.bankID = bs.bank_identifier
group by e.perID;
-- Uncomment above line and implement your code here