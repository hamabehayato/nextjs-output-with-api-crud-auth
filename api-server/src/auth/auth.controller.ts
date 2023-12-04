import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from './entity/User';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * SineIn
 *
 * @route POST /api/singin
 */
export const singIn = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as SignInUserDto;

    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(newUser);

    res.status(200).json('Create User');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error' });
  }
};

/**
 * Update a user by ID
 *
 * @route PUT /api/user/:id
 */
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body as UpdateUserDto;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: parseInt(id, 10) });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 更新するフィールドを設定
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;

    // データベースに保存
    await userRepository.save(user);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/**
 * Delete a user by ID
 *
 * @route DELETE /api/user/:id
 */
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const deleteUser = await userRepository.findOneBy({ id: parseInt(id, 10) });

    if (!deleteUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    await userRepository.delete(deleteUser);

    res.status(200).json(`Delete: id ${deleteUser.id}`);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
