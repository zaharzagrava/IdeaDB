-- 
insert into client(id) values(1);

insert into knowledge_file(id, html_text, plain_text, last_date_modified, date_created, word_count)
            values('<p>Attribute describes the system</p>', 'Attribute describes the ssytem',
                   timestamptz '2019-08-26 10:00:00+03', timestamptz '2019-08-26 10:00:00+03', 2);
insert into knowledge_file(id, html_text, plain_text, last_date_modified, date_created, word_count)
            values('<p>System is a fundamental analysis tool</p>', 'System is a fundamental analysis tool',
                   timestamptz '2019-08-26 10:00:00+03', timestamptz '2019-08-26 10:00:00+03', 2);

insert into kftag(id, kftag_type, kftag_name) VALUES ('identifier', 'attribute');
insert into kftag(id, kftag_type, kftag_name) VALUES ('identifier', 'system');

insert into client_knowledge_file(id, client_id, knowledge_file_id) values (1, 1, 1);
insert into client_knowledge_file(id, client_id, knowledge_file_id) values (2, 1, 2);

insert into knowledge_file_kftag(id, kftag_id, knowledge_file_id) VALUES (1, 1, 1);
insert into knowledge_file_kftag(id, kftag_id, knowledge_file_id) VALUES (2, 2, 2);

-- select all knowledge files that have 'system' 'identifier' kftag
select (id, html_text)
from knowledge_file
where kftag.kftag_type = 'system' AND kftag.kftag_name = 'identifier'
inner join knowledge_file_kftag on knowledge_file.id = knowledge_file_kftag.knowledge_file_id
inner join kftag on kftag.id = knowledge_file_kftag.id

-- select knowledge_file by its tags and name
select (knowledge_file.id, knowledge_file.html_text)
from knowledge_file
inner join knowledge_file_kftag on knowledge_file.id = knowledge_file_kftag.knowledge_file_id
inner join kftag on knowledge_file_kftag.kftag_id = kftag.id
where   knowledge_file.plain_text like '%fundamental%'
        and (kftag.kftag_type = 'identifier' AND kftag.kftag_name = 'system')

-- create a knowledge_file
insert into knowledge_file(html_text, plain_text, last_date_modified, date_created, word_count)
            values('<p>Third</p>', 'third',
                   timestamptz '2019-08-26 10:00:00+03', timestamptz '2019-08-26 10:00:00+03', 1);

insert into 

-- update a knowledge_file
update knowledge_file
set html_text='New System Definition'
where knowledge_file.id = 2;

-- delete knowledge file by id
delete from knowledge_file where knowledge_file.id = 3;

-- delete knowledge file by tag_type and tag_name


-- create a client
insert into client(full_name) values('Petro');

-- update a client
update client
set full_name='New Full Name'
where client.id = 2;

-- delete client by id
delete from client where client.id = 3;

-- create a tag
insert into kftag(tag_type, tag_name) values('New Tag Type', 'New Tag Name');

-- update a tag
update kftag
set tag_type='New Tag Type'
where kftag.id = 2;

-- delete tag by id
delete from kftag where kftag.id = 3;