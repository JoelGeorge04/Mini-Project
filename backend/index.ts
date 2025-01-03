import express from 'express';
import sequelize from './models';
import AuthRoutes from './routes/auth.routes';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;  //using the default port 3000

app.use('/api',new AuthRoutes().router);

const routes = [new AuthRoutes()];
                                    
routes.forEach((route) => {
    app.use('/api', route.router);
});

sequelize.authenticate().then(async () => {
    await sequelize.sync()
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
    
// db.sequelize.sync().then(() => {   //dynamically to make changes in the database
//     app.listen(port, () => {
//         console.log(`Server is running on port ${port}`);
//     });
// });