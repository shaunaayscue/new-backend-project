### Express Routes Project
A project using NODE and Express JS.

### Installation

- Get the project
  - download zip
  - clone
```
git clone https://github.com/shaunaayscue/new-backend-project
```

- Open the project in VSCode.
- Open a Terminal.
- Install required packages.
```
npm install
```
- Start the server
```
nodemon server.js
```

### API Endpoints
Use ThunderClient to try the following endpoints:

### Get list of products
- Request - Get /products/all
```
http://localhost:3000/products/all
```

- Response
```
[
{"product_id": 1,"product_name": "The Handmaid's Tale","description": "The Handmaid's Tale by Margaret Atwood is a dystopian novel about a woman, Offred, living in a theocratic society where women are controlled and used for reproduction.","image_url": "../images/handmaids-tale.jpg","price": 14.99,"isbn": "9781250","author": "Margaret Atwood","category_id": 1,"pages": 325,"publisher": "RANDOM HOUSE UK","featured": 0,"trending": 1,"new_release": 0},
{"product_id": 2,"product_name": "The Last Ember","description": "The Last Ember by Daniel Levin is a gripping archaeological thriller that intertwines history, mystery, and adventure as an ancient secret is uncovered in Rome.","image_url": "../images/last-ember.jpg","price": 16.99,"isbn": "978045229","author": "Daniel Levin","category_id": 1,"pages": 432,"publisher": "Riverhead Books","featured": 0,"trending": 0,"new_release": 1},
{"product_id": 3,"product_name": "The Great Gatsby","description": "The Great Gatsby by F Scott Fitzgerald is a classic novel that explores themes of wealth, love, and the American Dream through the mysterious figure of Jay Gatsby.","image_url": "../images/gatsby.jpg","price": 13.99,"isbn": "978074327","author": "F. Scott Fitzgerald","category_id": 1,"pages": 180,"publisher": "Charles Scribner's Sons","featured": 0,"trending": 1,"new_release": 0},
{"product_id": 4,"product_name": "The Alchemist","description": "The Alchemist by Paulo Coelho is an inspiring novel about self-discovery and following one’s destiny, centered around Santiago, a shepherd in search of treasure.","image_url": "../images/the-alchemist.jpg","price": 12.99,"isbn": "978006112","author": "Paulo Coelho","category_id": 1,"pages": 197,"publisher": "HarperOne","featured": 1,"trending": 0,"new_release": 0},
{"product_id": 5,"product_name": "The Diary of a Young Girl","description": "The Diary of a Young Girl by Anne Frank is a firsthand account of her life in hiding during WWII.","image_url": "../images/diary-of-young-girl.jpg","price": 12.99,"isbn": "975947258","author": "Anne Frank, Otto M. Frank (Editor), Mirjam Pressler (Editor), Susan Massotty (Translator)","category_id": 2,"pages": 400,"publisher": "Bantam","featured": 1,"trending": 0,"new_release": 0},
{"product_id": 6,"product_name": "Educating Rita","description": "Educating Rita by Willy Russell is a play about personal growth and education.","image_url": "../images/educating-rita.jpg","price": 14.99,"isbn": "960493647","author": "Willy Russell","category_id": 2,"pages": 96,"publisher": "Methuen Drama","featured": 0,"trending": 0,"new_release": 0},
{"product_id": 7,"product_name": "Quiet: The Power of Introverts in a World That Can't Stop Talking","description": "Quiet: The Power of Introverts in a World That Can't Stop Talking by Susan Cain explores the strengths of introverts.","image_url": "../images/quiet.jpg","price": 18.99,"isbn": "970593758","author": "Susan Cain","category_id": 2,"pages": 333,"publisher": "Crown","featured": 0,"trending": 0,"new_release": 1},
{"product_id": 8,"product_name": "The JFK Conspiracy: The Secret Plot to Kill Kennedy-and Why It Failed","description": "The JFK Conspiracy examines the assassination of John F. Kennedy and the secrets behind it.","image_url": "../images/jfk-conspiracy.jpg","price": 20.99,"isbn": "913570896","author": "Brad Meltzer, Josh Mensch","category_id": 2,"pages": 304,"publisher": "Flatiron Books","featured": 0,"trending": 0,"new_release": 1},
{"product_id": 9,"product_name": "It Ends With Us","description": "It Ends With Us by Colleen Hoover is a contemporary romance novel that explores love, resilience, and difficult choices.","image_url": "../images/it-ends-with-us.jpg","price": 15.99,"isbn": "960584346","author": "Colleen Hoover","category_id": 3,"pages": 378,"publisher": "SIMON SCHUSTER","featured": 0,"trending": 1,"new_release": 0},
{"product_id": 10,"product_name": "The Notebook","description": "The Notebook by Nicholas Sparks is a timeless love story about passion, memory, and destiny.","image_url": "../images/the-notebook.jpg","price": 12.99,"isbn": "908765476","author": "Nicholas Sparks","category_id": 3,"pages": 226,"publisher": "Grand Central Publishing","featured": 0,"trending": 1,"new_release": 0},
{"product_id": 11,"product_name": "Me Before You","description": "Me Before You by Jojo Moyes is an emotional romance novel about an unexpected love story that changes lives.","image_url": "../images/me-before-you.jpg","price": 14.99,"isbn": "968795490","author": "Jojo Moyes","category_id": 3,"pages": 369,"publisher": "Penguin Books","featured": 0,"trending": 0,"new_release": 0},
{"product_id": 12,"product_name": "The Hating Game","description": "The Hating Game by Sally Thorne is a witty and romantic office rivalry story.","image_url": "../images/the-hating-game.jpg","price": 16.99,"isbn": "9342533456","author": "Sally Thorne","category_id": 3,"pages": 384,"publisher": "HarperCollins","featured": 1,"trending": 0,"new_release": 0},
{"product_id": 13,"product_name": "The Silent Patient","description": "The Silent Patient by Alex Michaelides is a gripping psychological thriller about a woman who stops speaking after a crime.","image_url": "../images/silent-patient.jpg","price": 19.99,"isbn": "988697778","author": "Alex Michaelides","category_id": 4,"pages": 481,"publisher": "Large Print Press","featured": 1,"trending": 0,"new_release": 0},
{"product_id": 14,"product_name": "The Girl with the Dragon Tattoo","description": "The Girl with the Dragon Tattoo by Stieg Larsson is a gripping mystery thriller filled with suspense and intrigue.","image_url": "../images/dragon-tattoo.jpg","price": 16.99,"isbn": "900089765","author": "Stieg Larsson","category_id": 4,"pages": 600,"publisher": "Vintage Crime/Black Lizard","featured": 0,"trending": 0,"new_release": 0},
{"product_id": 15,"product_name": "Before I Go to Sleep","description": "Before I Go to Sleep by S.J. Watson is a psychological thriller about memory loss and hidden truths.","image_url": "../images/before-i-go-to-sleep.jpg","price": 12.99,"isbn": "943443123","author": "S.J. Watson","category_id": 4,"pages": 368,"publisher": "Harper Paperbacks","featured": 0,"trending": 0,"new_release": 1},
{"product_id": 16,"product_name": "The Couple Next Door","description": "The Couple Next Door by Shari Lapena is a suspenseful thriller about secrets and betrayal.","image_url": "../images/couple-next-door.jpg","price": 14.49,"isbn": "913888765","author": "Shari Lapena","category_id": 4,"pages": 336,"publisher": "Penguin Books","featured": 0,"trending": 0,"new_release": 0},
{"product_id": 17,"product_name": "Harry Potter and the Sorcerer's Stone","description": "Harry Potter and the Sorcerer's Stone by J.K. Rowling follows a young boy who discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.","image_url": "../images/harry-potter.jpg","price": 14.99,"isbn": "911115678","author": "J.K. Rowling","category_id": 5,"pages": 424,"publisher": "Large Print Press","featured": 0,"trending": 0,"new_release": 0},
{"product_id": 18,"product_name": "The Hobbit","description": "The Hobbit by J.R.R. Tolkien is a fantasy adventure following Bilbo Baggins on a quest to reclaim a lost dwarf kingdom.","image_url": "../images/the-hobbit.jpg","price": 13.99,"isbn": "909876589","author": "J.R.R. Tolkien","category_id": 5,"pages": 300,"publisher": "Houghton Mifflin Harcourt","featured": 0,"trending": 0"new_release": 0},
{"product_id": 19,"product_name": "A Song of Ice and Fire","description": "A Song of Ice and Fire by George R.R. Martin is an epic fantasy series filled with political intrigue, battles, and mythical creatures.","image_url": "../images/a-song-of-ice-and-fire.jpg","price": 19.99,"isbn": "922345232","author": "George R.R. Martin","category_id": 5,"pages": 336,"publisher": "Random House Worlds","featured": 0,"trending": 0,"new_release": 0},
{"product_id": 20,"product_name": "The Name of the Wind","description": "The Name of the Wind by Patrick Rothfuss tells the story of Kvothe, a gifted young man who grows into a legendary figure.","image_url": "../images/name-of-the-wind.jpg","price": 15.99,"isbn": "977865789","author": "Patrick Rothfuss","category_id": 5,"pages": 736,"publisher": "DAW","featured": 0,"trending": 0,"new_release": 0}
]
```
### Get products by search and by category
- Get product by category
  - Request - Get /products?category_name={category_name}
```
http://localhost:3000/products?category_name=Fiction
```
  - Response
```
[
{"product_id": 1,"product_name": "The Handmaid's Tale","description": "The Handmaid's Tale by Margaret Atwood is a dystopian novel about a woman, Offred, living in a theocratic society where women are controlled and used for reproduction.","image_url": "../images/handmaids-tale.jpg","price": 14.99,"isbn": "9781250","author": "Margaret Atwood","category_id": 1,"pages": 325,"publisher": "RANDOM HOUSE UK","featured": 0,"trending": 1,"new_release": 0},
{"product_id": 2,"product_name": "The Last Ember","description": "The Last Ember by Daniel Levin is a gripping archaeological thriller that intertwines history, mystery, and adventure as an ancient secret is uncovered in Rome.","image_url": "../images/last-ember.jpg","price": 16.99,"isbn": "978045229","author": "Daniel Levin","category_id": 1,"pages": 432,"publisher": "Riverhead Books","featured": 0,"trending": 0,"new_release": 1},
{"product_id": 3,"product_name": "The Great Gatsby","description": "The Great Gatsby by F Scott Fitzgerald is a classic novel that explores themes of wealth, love, and the American Dream through the mysterious figure of Jay Gatsby.","image_url": "../images/gatsby.jpg","price": 13.99,"isbn": "978074327","author": "F. Scott Fitzgerald","category_id": 1,"pages": 180,"publisher": "Charles Scribner's Sons","featured": 0,"trending": 1,"new_release": 0},
{"product_id": 4,"product_name": "The Alchemist","description": "The Alchemist by Paulo Coelho is an inspiring novel about self-discovery and following one’s destiny, centered around Santiago, a shepherd in search of treasure.","image_url": "../images/the-alchemist.jpg","price": 12.99,"isbn": "978006112","author": "Paulo Coelho","category_id": 1,"pages": 197,"publisher": "HarperOne","featured": 1,"trending": 0,"new_release": 0}
]
```
- Get product by search
  - Request - Get /products?attribute=product_name&value={product_name}

```
http://localhost:3000/products?attribute=product_name&value=The%20Last%20Ember
```

  - Response
```
[
{"product_id": 2,"product_name": "The Last Ember","description": "The Last Ember by Daniel Levin is a gripping archaeological thriller that intertwines history, mystery, and adventure as an ancient secret is uncovered in Rome.","image_url": "../images/last-ember.jpg","price": 16.99,"isbn": "978045229","author": "Daniel Levin","category_id": 1,"pages": 432,"publisher": "Riverhead Books","featured": 0,"trending": 0,"new_release": 1}
]
```

- Get product by search and category
  - Request - Get /products?attribute=product_name&value={product_name}&category_name={category_name}
```
http://localhost:3000/products?attribute=product_name&value=The%20Handmaid's%20Tale&category_name=Fiction
```

  - Response
```
[
{"product_id": 1,"product_name": "The Handmaid's Tale","description": "The Handmaid's Tale by Margaret Atwood is a dystopian novel about a woman, Offred, living in a theocratic society where women are controlled and used for reproduction.","image_url": "../images/handmaids-tale.jpg","price": 14.99,"isbn": "9781250","author": "Margaret Atwood","category_id": 1,"pages": 325,"publisher": "RANDOM HOUSE UK","featured": 0,"trending": 1,"new_release": 0}
]
```

### Get one product with details
- Request - Get /products/{product_id}
```
http://localhost:3000/products/5
```
- Response
```
{"product_id": 5,"product_name": "The Diary of a Young Girl","description": "The Diary of a Young Girl by Anne Frank is a firsthand account of her life in hiding during WWII.","image_url": "../images/diary-of-young-girl.jpg","price": 12.99,"isbn": "975947258","author": "Anne Frank, Otto M. Frank (Editor), Mirjam Pressler (Editor), Susan Massotty (Translator)","category_id": 2,"pages": 400,"publisher": "Bantam","featured": 1,"trending": 0,"new_release": 0}
```
### Add products to a cart
- Request - Post /cart/dd
```
http://localhost:3000/cart/add
```

- JSON BODY
```
{
    "user_id": 1,
    "product_id": 7,
    "quantity": 3
}
```

- Response
```
{
  "success": true,
  "result": {
    "changes": 1,
    "lastInsertRowid": 1
  }
}
```
(Add a second JSON body seperately to do the "removing a product from cart" endpoint next.)
- Second JSON BODY
```
{
    "user_id": 1,
    "product_id": 20,
    "quantity": 1
}
```

- Response
```
{
  "success": true,
  "result": {
    "changes": 1,
    "lastInsertRowid": 2
  }
}
```

### Remove products from a cart
- Request - Delete /cart/{user_id}/products/delete/{product_id}
```
http://localhost:3000/cart/1/products/delete/20
```

- Response
```
{
  "success": true,
  "result": {
    "changes": 1,
    "lastInsertRowid": 2
  }
}
```
### Checkout (empty a cart)
- Request - Post /cart/{user_id}/checkout
```
http://localhost:3000/cart/1/checkout
```

- Response
```
{
  "success": true,
  "result": {
    "success": true,
    "message": "Checkout successful"
  }
}
```
### Add a new product
- Request - Post /admin/products/add
```
 http://localhost:3000/admin/products/add
```

-JSON BODY
```
{
  "product_name": "New Product",
  "description": "New Description",
  "image_url": "../images/new.jpg",
  "price": 12.99,
  "isbn": "875497",
  "author": "New Author",
  "category_id": 2,
  "pages": 400,
  "publisher": "New Publisher",
  "featured": 0,
  "trending": 1,
  "new_release": 0
}
```

- Response
```
{
  "changes": 1,
  "lastInsertRowid": 21
}
```

### Edit a product/ Change a listing
- Request - Put /admin/products/edit/{product_id}
```
http://localhost:3000/admin/products/edit/21
```
- JSON BODY
```
{
  "product_name": "Update Product",
  "description": "Update Description",
  "image_url": "../images/update.jpg",
  "price": 19.99,
  "isbn": "648903",
  "author": "Update Author",
  "category_id": 1,
  "pages": 200,
  "publisher": "Update Publisher",
  "featured": 1,
  "trending": 0,
  "new_release": 1
}
```

- Response
```
{
  "changes": 1,
  "lastInsertRowid": 21
}
```

### Delete a product
- Request - Delete /admin/products/delete/{product_id}
```
http://localhost:3000/admin/products/delete/21
```

- Response
```
[
{"product_id": 1,"product_name": "The Handmaid's Tale","description": "The Handmaid's Tale by Margaret Atwood is a dystopian novel about a woman, Offred, living in a theocratic society where women are controlled and used for reproduction.","image_url": "../images/handmaids-tale.jpg","price": 14.99,"isbn": "9781250","author": "Margaret Atwood","category_id": 1,"pages": 325,"publisher": "RANDOM HOUSE UK","featured": 0,"trending": 1,"new_release": 0},
{"product_id": 2,"product_name": "The Last Ember","description": "The Last Ember by Daniel Levin is a gripping archaeological thriller that intertwines history, mystery, and adventure as an ancient secret is uncovered in Rome.","image_url": "../images/last-ember.jpg","price": 16.99,"isbn": "978045229","author": "Daniel Levin","category_id": 1,"pages": 432,"publisher": "Riverhead Books","featured": 0,"trending": 0,"new_release": 1},
{"product_id": 3,"product_name": "The Great Gatsby","description": "The Great Gatsby by F Scott Fitzgerald is a classic novel that explores themes of wealth, love, and the American Dream through the mysterious figure of Jay Gatsby.","image_url": "../images/gatsby.jpg","price": 13.99,"isbn": "978074327","author": "F. Scott Fitzgerald","category_id": 1,"pages": 180,"publisher": "Charles Scribner's Sons","featured": 0,"trending": 1,"new_release": 0},
{"product_id": 4,"product_name": "The Alchemist","description": "The Alchemist by Paulo Coelho is an inspiring novel about self-discovery and following one’s destiny, centered around Santiago, a shepherd in search of treasure.","image_url": "../images/the-alchemist.jpg","price": 12.99,"isbn": "978006112","author": "Paulo Coelho","category_id": 1,"pages": 197,"publisher": "HarperOne","featured": 1,"trending": 0,"new_release": 0},
{"product_id": 5,"product_name": "The Diary of a Young Girl","description": "The Diary of a Young Girl by Anne Frank is a firsthand account of her life in hiding during WWII.","image_url": "../images/diary-of-young-girl.jpg","price": 12.99,"isbn": "975947258","author": "Anne Frank, Otto M. Frank (Editor), Mirjam Pressler (Editor), Susan Massotty (Translator)","category_id": 2,"pages": 400,"publisher": "Bantam","featured": 1,"trending": 0,"new_release": 0},
{"product_id": 6,"product_name": "Educating Rita","description": "Educating Rita by Willy Russell is a play about personal growth and education.","image_url": "../images/educating-rita.jpg","price": 14.99,"isbn": "960493647","author": "Willy Russell","category_id": 2,"pages": 96,"publisher": "Methuen Drama","featured": 0,"trending": 0,"new_release": 0},
{"product_id": 7,"product_name": "Quiet: The Power of Introverts in a World That Can't Stop Talking","description": "Quiet: The Power of Introverts in a World That Can't Stop Talking by Susan Cain explores the strengths of introverts.","image_url": "../images/quiet.jpg","price": 18.99,"isbn": "970593758","author": "Susan Cain","category_id": 2,"pages": 333,"publisher": "Crown","featured": 0,"trending": 0,"new_release": 1},
{"product_id": 8,"product_name": "The JFK Conspiracy: The Secret Plot to Kill Kennedy-and Why It Failed","description": "The JFK Conspiracy examines the assassination of John F. Kennedy and the secrets behind it.","image_url": "../images/jfk-conspiracy.jpg","price": 20.99,"isbn": "913570896","author": "Brad Meltzer, Josh Mensch","category_id": 2,"pages": 304,"publisher": "Flatiron Books","featured": 0,"trending": 0,"new_release": 1},
{"product_id": 9,"product_name": "It Ends With Us","description": "It Ends With Us by Colleen Hoover is a contemporary romance novel that explores love, resilience, and difficult choices.","image_url": "../images/it-ends-with-us.jpg","price": 15.99,"isbn": "960584346","author": "Colleen Hoover","category_id": 3,"pages": 378,"publisher": "SIMON SCHUSTER","featured": 0,"trending": 1,"new_release": 0},
{"product_id": 10,"product_name": "The Notebook","description": "The Notebook by Nicholas Sparks is a timeless love story about passion, memory, and destiny.","image_url": "../images/the-notebook.jpg","price": 12.99,"isbn": "908765476","author": "Nicholas Sparks","category_id": 3,"pages": 226,"publisher": "Grand Central Publishing","featured": 0,"trending": 1,"new_release": 0},
{"product_id": 11,"product_name": "Me Before You","description": "Me Before You by Jojo Moyes is an emotional romance novel about an unexpected love story that changes lives.","image_url": "../images/me-before-you.jpg","price": 14.99,"isbn": "968795490","author": "Jojo Moyes","category_id": 3,"pages": 369,"publisher": "Penguin Books","featured": 0,"trending": 0,"new_release": 0},
{"product_id": 12,"product_name": "The Hating Game","description": "The Hating Game by Sally Thorne is a witty and romantic office rivalry story.","image_url": "../images/the-hating-game.jpg","price": 16.99,"isbn": "9342533456","author": "Sally Thorne","category_id": 3,"pages": 384,"publisher": "HarperCollins","featured": 1,"trending": 0,"new_release": 0},
{"product_id": 13,"product_name": "The Silent Patient","description": "The Silent Patient by Alex Michaelides is a gripping psychological thriller about a woman who stops speaking after a crime.","image_url": "../images/silent-patient.jpg","price": 19.99,"isbn": "988697778","author": "Alex Michaelides","category_id": 4,"pages": 481,"publisher": "Large Print Press","featured": 1,"trending": 0,"new_release": 0},
{"product_id": 14,"product_name": "The Girl with the Dragon Tattoo","description": "The Girl with the Dragon Tattoo by Stieg Larsson is a gripping mystery thriller filled with suspense and intrigue.","image_url": "../images/dragon-tattoo.jpg","price": 16.99,"isbn": "900089765","author": "Stieg Larsson","category_id": 4,"pages": 600,"publisher": "Vintage Crime/Black Lizard","featured": 0,"trending": 0,"new_release": 0},
{"product_id": 15,"product_name": "Before I Go to Sleep","description": "Before I Go to Sleep by S.J. Watson is a psychological thriller about memory loss and hidden truths.","image_url": "../images/before-i-go-to-sleep.jpg","price": 12.99,"isbn": "943443123","author": "S.J. Watson","category_id": 4,"pages": 368,"publisher": "Harper Paperbacks","featured": 0,"trending": 0,"new_release": 1},
{"product_id": 16,"product_name": "The Couple Next Door","description": "The Couple Next Door by Shari Lapena is a suspenseful thriller about secrets and betrayal.","image_url": "../images/couple-next-door.jpg","price": 14.49,"isbn": "913888765","author": "Shari Lapena","category_id": 4,"pages": 336,"publisher": "Penguin Books","featured": 0,"trending": 0,"new_release": 0},
{"product_id": 17,"product_name": "Harry Potter and the Sorcerer's Stone","description": "Harry Potter and the Sorcerer's Stone by J.K. Rowling follows a young boy who discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.","image_url": "../images/harry-potter.jpg","price": 14.99,"isbn": "911115678","author": "J.K. Rowling","category_id": 5,"pages": 424,"publisher": "Large Print Press","featured": 0,"trending": 0,"new_release": 0},
{"product_id": 18,"product_name": "The Hobbit","description": "The Hobbit by J.R.R. Tolkien is a fantasy adventure following Bilbo Baggins on a quest to reclaim a lost dwarf kingdom.","image_url": "../images/the-hobbit.jpg","price": 13.99,"isbn": "909876589","author": "J.R.R. Tolkien","category_id": 5,"pages": 300,"publisher": "Houghton Mifflin Harcourt","featured": 0,"trending": 0"new_release": 0},
{"product_id": 19,"product_name": "A Song of Ice and Fire","description": "A Song of Ice and Fire by George R.R. Martin is an epic fantasy series filled with political intrigue, battles, and mythical creatures.","image_url": "../images/a-song-of-ice-and-fire.jpg","price": 19.99,"isbn": "922345232","author": "George R.R. Martin","category_id": 5,"pages": 336,"publisher": "Random House Worlds","featured": 0,"trending": 0,"new_release": 0},
{"product_id": 20,"product_name": "The Name of the Wind","description": "The Name of the Wind by Patrick Rothfuss tells the story of Kvothe, a gifted young man who grows into a legendary figure.","image_url": "../images/name-of-the-wind.jpg","price": 15.99,"isbn": "977865789","author": "Patrick Rothfuss","category_id": 5,"pages": 736,"publisher": "DAW","featured": 0,"trending": 0,"new_release": 0}
]
```
### Bulk uploading new products from JSON
- Request - Post /admin/products/bulk
```
http://localhost:3000/admin/products/bulk
```
-JSON BODY
```
[
    {
        "product_name": "Bulk Product",
        "description": "Bulk Description",
        "image_url": "../images/bulk.jpg",
        "price": 19.99,
        "isbn": "123342",
        "author": "Bulk Author",
        "category_id": 1,
        "pages": 200,
        "publisher": "Bulk Publisher",
        "featured": 1,
        "trending": 0,
        "new_release": 1
    },
    {
        "product_name": "Bulk Product 2",
        "description": "Bulk Description",
        "image_url": "../images/bulk2.jpg",
        "price": 259.99,
        "isbn": "763568",
        "author": "Bulk Author 2",
        "category_id": 2,
        "pages": 300,
        "publisher": "Bulk Publisher 2",
        "featured": 0,
        "trending": 0,
        "new_release": 0
    }
]
```

- Response
```
{
  "success": true,
  "result": {
    "success": true,
    "message": "Bulk upload successful"
  }
}
```
