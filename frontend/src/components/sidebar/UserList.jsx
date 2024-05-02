// Parent Component rendering UserListItem
import UserListItem from "./UserListItem";

const UserList = ({ userList }) => {
    return (
        <div>
            {userList.map(user => (
                <UserListItem key={user.id} user={user} />
            ))}
        </div>
    );
};

export default UserList;
