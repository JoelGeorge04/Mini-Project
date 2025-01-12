declare namespace Express{
    export interface Request {
        user: import("../interface/auth.interface").UserData;              //now within the Express Requsest object, we have a 'user' property
    }   
}