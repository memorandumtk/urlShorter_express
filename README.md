# URL Shortener Microservice

This is the boilerplate code for the URL Shortener Microservice project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice.


### MongoDB surprise point
The first argument is the *singular* name of the collection your model is for. **Mongoose automatically looks for the *plural* version of your model name.** For example, if you use

`const MyModel = mongoose.model('Ticket', mySchema);`

Then `MyModel` will use the **tickets** collection, not the **ticket** collection. For more details read the **[model docs](https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-model)**.