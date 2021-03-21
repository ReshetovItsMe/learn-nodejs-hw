import * as express from 'express';
import { User } from '../interfaces/user';
import { UsersSevice } from '../services'

const router = express.Router();
const userService = new UsersSevice();

router.get('/byId', (req, res) => {
  const userId: string = req.query.id as string;
  if (!!userId) {
    const user: User = userService.getUser(userId);
    !!user ? res.json(user) : res.send(`User with id='${userId}' not found`);
  }
  res.status(400).send('Bad data. Please check your request.');
});

router.get('/', (req, res) => {
  const users: User[] = userService.getAllUsers();
  res.json(users);
});

router.post('/addUser', (req, res) => {
  const user: User = req.body;
  if (!!user) {
    const users: User[] = userService.createUser(user);
    res.status(201).send(users);
  } else {
    res.status(400).send('Bad data. Please check your request.');
  }
});

router.put('/updateUser', (req, res) => {
  const user: User = req.body;
  if (!!user) {
    const users: User[] = userService.updateUser(user);
    res.status(201).send(users);
  } else {
    res.status(400).send('Bad data. Please check your request.');
  }
});

router.delete('/byId', (req, res) => {
  const userId: string = req.query.id as string;
  if (!!userId) {
    const users: User[] = userService.deleteUser(userId);
    res.status(201).send(users);
  } else {
    res.status(400).send('Bad data. Please check your request.');
  }
});

export default router;
