import { Router } from 'express';
// import { createUser, deleteUser, getAllUsers, getUserById, updateUser, addFriend, removeFriend  } from '../../controllers/user-controller';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser, addFriend, removeFriend } from '../../controllers/user-controller.js';
const router = Router();
// /api/users
router.route('/').get(getAllUsers).post(createUser);
// /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);
// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
export { router as userRoutes };
// import { Router } from 'express';
// import { createUser, deleteUser, getAllUsers, getUserById, updateUser, addFriend, removeFriend  } from '../../controllers/user-controller';
// const userRoutes = Router();
// // /api/users
// userRoutes.route('/').get(getAllUsers).post(createUser);
// // /api/users/:userId
// userRoutes.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);
// // /api/users/:userId/friends/:friendId
// userRoutes.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
// export default userRoutes  ;
