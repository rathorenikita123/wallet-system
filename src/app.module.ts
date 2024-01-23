import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nikitarathore271201:XMurLwzgCXRMBsBV@cluster0.7spti7o.mongodb.net/?retryWrites=true&w=majority',
    ),
    UserModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
