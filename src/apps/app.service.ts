import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  private readonly uploadPath = './src/uploads'; // Fayl saqlanadigan papka yo'li

  getHello(): string {
    return 'Hello World!';
  }
}


