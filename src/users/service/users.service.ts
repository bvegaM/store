import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../entities/dto/create_user.dto';
import { UpdateUserDto } from '../entities/dto/update_user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'vegabryam40@gmail.com',
      password: 'patito.123',
      role: 'admin',
    },
  ];

  findAll() {
    if (this.users.length == 0) {
      throw new NotFoundException(`No existen datos de usuarios`);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: `El usuario ${id} no se encuentra registrado`,
      });
    }
    return user;
  }

  create(payload: CreateUserDto) {
    if (!payload) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: `No hay los suficientes datos para crear al usuario`,
      });
    }
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return {
      status: HttpStatus.OK,
      message: `usuario creado exitosamente`,
      body: newUser,
    };
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: `Usuario ${id} no encontrado`,
      };
    }
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = {
      ...user,
      ...payload,
    };
    return {
      status: HttpStatus.OK,
      message: `usuario ${id} modificado exitosamente`,
      body: this.users[index],
    };
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: `No se ha encontrado el usuario ${id}`,
      });
    }
    this.users.splice(index, 1);
    return {
      status: HttpStatus.NOT_FOUND,
      message: `Usuario ${id} eliminado exitosamente`,
    };
  }
}
