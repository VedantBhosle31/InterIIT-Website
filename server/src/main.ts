import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

const port: string = process.env.PORT as string;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(
    session({
      secret: 'SECRET',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 600,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(port);
}
bootstrap();
