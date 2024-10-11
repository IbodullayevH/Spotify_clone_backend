import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

@Controller('upload')
export class FileController {

    constructor() { }


    static fileOptions() {
        return {
            storage: diskStorage({
                destination: './src/uploads', 
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname); 
                    const fileName = `${file.fieldname}-${uniqueSuffix}${ext}`;
                    cb(null, fileName);
                },
            }),
            filePath: './src/uploads', 
        };
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', FileController.fileOptions())) 
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            return { message: 'Fayl yuklanmadi!' };
        }

        const filePath = `./src/uploads/${file.filename}`;
        return { message: 'Fayl muvaffaqiyatli saqlandi!', filePath };
    }
}
