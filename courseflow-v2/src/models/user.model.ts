export interface User {
    id: string; //UUID - unique identifier for every user

    email: string; //used for login and communication

    displayName: string;    // what the user sees
            
    passwordHash: string;      //Never the real password, a hashed version only

    enrolledCourseIds: string[];    //List of course IDS this student is in

    createdAt: Date;        //When the account was made
}