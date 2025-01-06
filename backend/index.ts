import express from 'express';
import cors from 'cors';  // Import CORS
import sequelize from './models';
import AuthRoutes from './routes/auth.routes';
import PostRoutes from './routes/post.routes';

const app = express();

// Enable CORS for all origins
app.use(cors());  // Allow all origins (or configure for specific origins as needed)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

// Set up the routes
app.use('/api', new AuthRoutes().router);

const routes = [new AuthRoutes(), new PostRoutes()];

routes.forEach((route) => {
  app.use('/api', route.router);
});

sequelize.authenticate().then(async () => {
  await sequelize.sync();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
