const mongoose = require('mongoose'); 
//We are using the mongoose validator and the express validator package


const ProductSchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true, 'Please provide product name'],
        maxlength:[100,'Name can not be more than 100 characters']
    },
    price:{
        type:Number,
        required:[true, 'Please provide product price'],
        default:0,
    },
    description:{
        type:String,
        trim:true,
        required:[true, 'Please provide description'],
        maxlength:[1000,'Description can not be more than 1000 characters']
    },
    image:{
        type:String,
        default:'uploads/example.jpg',
    },
    category:{
        type:String,
        required:[true, 'Please provide product category'],
        enum:['office','kitchen','bedroom'],
    },
    company:{
        type:String,
        required:[true, 'Please provide company'],
        enum:{
            values:['ikea','liddy','marcos'],
            message:'{VALUE} is not supported',
        }        
    },
    colors:{
        type:[String],
        default:['#222'],
        required:true,
    },
    featured:{
        type:Boolean,
        default:false,
    },
    freeShipping:{
        type:Boolean,
        default:false,
    },
    inventory:{
        type:Number,
        required:true,
        default:15,
    },
    averageRating:{
        type:Number,
        default:0
    },

    numOfReviews:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        require:true
    }
},
{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}}
);

ProductSchema.virtual('reviews',{
    ref:'Review',
    localField:'_id',
    foreignField: 'product',
    justOne:false,
    match:{rating:1}
});

//if we remove a product, this hook removes the reviews associated with that product
//we associate the Review model with its 'product' property with the _id of the producto in Product model
ProductSchema.pre('remove',async function(next){
    await this.model('Review').deleteMany({product:this._id})
})

module.exports=mongoose.model('Product',ProductSchema)