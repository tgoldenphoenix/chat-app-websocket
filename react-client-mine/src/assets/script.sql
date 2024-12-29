drop table chatuser;

insert into chatuser (nick_name, full_name, status) values
    ('anhao', 'anhao', 'OFFLINE');
insert into chatuser (nick_name, full_name, status) values
    ('kimphuong', 'phuong', 'OFFLINE');
insert into chatuser (nick_name, full_name, status) values
    ('bilbo', 'bilbo', 'ONLINE');

update chatuser set status = 'OFFLINE' WHERE nick_name = 'anhao';
select * from chatuser;
