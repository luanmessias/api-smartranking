import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://admin:${process.env.MONGODB_KEY}@cluster0.q89qsey.mongodb.net/${process.env.MONGODB_CL}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
