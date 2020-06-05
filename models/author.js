var mongoose = require('mongoose');
var moment = require('moment')
var Schema = mongoose.Schema;


var AuthorSchema = new Schema({
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
});

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function() {
    
    // Safely handle where there may be no first / family name by returning
    // emtpy string
    
    var fullname = '';
    if (this.first_name && this.family_name) {
        fullname = this.family_name + ', ' + this.first_name;
    }
    if (!this.first_name || !this.family_name) {
        fullname = '';
    }
    return fullname;
})

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function() {
    var dateOfBirth = this.date_of_birth ? moment(this.date_of_birth).format('YYYY') : '';
    var dateOfDeath = this.date_of_death ? moment(this.date_of_death).format('YYYY') : '';
    return `${dateOfBirth} - ${dateOfDeath}`;
})

// Virtual for author's detailed lifespan
AuthorSchema
.virtual('lifespan_detailed')
.get(function() {
    var dateOfBirth = this.date_of_birth ? 'Born ' + moment(this.date_of_birth).format('Do MMMM YYYY') : '';
    var dateOfDeath = this.date_of_death ? 'Died ' + moment(this.date_of_death).format('Do MMMM YYYY') : '';
    return `${dateOfBirth} - ${dateOfDeath}`;
})

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function() {
    return '/catalog/author/' + this._id;
})

// Export module
module.exports = mongoose.model('Author', AuthorSchema);