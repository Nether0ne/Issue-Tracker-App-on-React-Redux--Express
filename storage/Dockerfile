FROM mongo

COPY ./migrate/users.json /users.json
COPY ./migrate/boards.json /boards.json
COPY ./migrate/queues.json /queues.json
COPY ./migrate/tasks.json /tasks.json
COPY ./migrate/activities.json /activities.json

CMD mongoimport --host mongodb --db mongoose --collection users --type json --file /users.json --jsonArray ; mongoimport --host mongodb --db mongoose --collection boards --type json --file /boards.json --jsonArray ; mongoimport --host mongodb --db mongoose --collection queues --type json --file /queues.json --jsonArray ; mongoimport --host mongodb --db mongoose --collection tasks --type json --file /tasks.json --jsonArray ; mongoimport --host mongodb --db mongoose --collection activities --type json --file /activities.json --jsonArray ;
