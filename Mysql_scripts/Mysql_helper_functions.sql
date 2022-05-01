-- [1] check_per_type()
# Input: person's ID and password
# Return: person's role in the database
drop function if exists check_per_type;
delimiter //
create function check_per_type(
	ip_perID varchar(100),
    ip_pwd varchar(100)
)
returns varchar(20)
deterministic
begin
	declare per_type varchar(20);
    
    if (select exists (select * from person where perID = ip_perID and pwd = ip_pwd)) then		# check if there is a matching pair username and password in the database
		if (select exists (select * from system_admin where perID = ip_perID)) then
			set per_type = 'admin';
		elseif (select exists (select * from bank where manager = ip_perID)) then
			set per_type = 'manager';
		elseif ((select exists (select * from customer where perID = ip_perID)) and (select exists (select * from employee where perID = ip_perID))) then
			set per_type = 'double';
		elseif (select exists (select * from customer where perID = ip_perID)) then
			set per_type = 'customer';
		elseif (select exists (select * from employee where perID = ip_perID)) then
			set per_type = 'employee';
		end if;
    else	# login info is not valid
		set per_type = 'NA';
	end if;
	return (per_type);
end //
delimiter ;

select check_per_type('ghopper9', 'password16')