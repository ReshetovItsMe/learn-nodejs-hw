# Second entity and many-to-many relationships

## PREREQUISITES

The task is a continuation of [Module 4. PostgreSQL and layered architecture](https://github.com/ReshetovItsMe/learn-nodejs-hw/tree/main/Module_4_PostgreSQL_and_layered_architecture).

## Task 1

Add Group entity to already existing REST service with CRUD operations.

* The Group entity should have the following properties(you can use UUID as Group id):

```typescript
type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES'


type Group = {
    id: string;
    name: string;
    permissions: Permission;
}
```

* The service should provide the following CRUD operations for Group:
  * get group by id;
  * get all groups;
  * create and update a group;
  * remove group (hard delete–group data is fully removed from the DB).
* Storing of groups data should be done in PostgreSQL in Groups table.
* The service should follow the principles of 3-layer architecture.

## Task 2

Link User records in one table with Group records in another table.

* Add a UserGroup table(“many-to-many” relationship) which will store the data describing which users are assigned to which group.
* If any record gets removed from the DB, then all linked records should be removed from UserGroup as well.

## Task 3

Add addUsersToGroup(groupId, userIds) method which will allow adding users to a certain group. Use transactions to save records in DB.
