import { useNavigate } from "react-router-dom";
import Banner from "../shared/components/Banner/banner";
import CarouselCard from "../shared/components/Carousels/carousels";
import Filter from "../shared/components/Filter/filter";
import "./main.css";
import { initialState } from "../shared/hooks/filterReducer";
import { useContext, useEffect, useState } from "react";
import { CounterContext } from "../shared/contexts/filterContext";
const dataGet = [
  {
    "id": 1,
    "name": "Zen - The Park",
    "rating": 4.5,
    "cuisines": [
      "Asian",
      "Chinese",
      "Thai",
      "Malaysian"
    ],
    "priceForTwo": 3500,
    "location": "Park Street Area, Kolkata",
    "distance": "2.4 km",
    "openingTime": "7pm",
    "offer": "Flat 15% OFF",
    "image": "assets/food/images1.jpg",
    "menuData": {
      "restaurantId": 1,
      "restaurantName": "Zen - The Park",
      "menu": {
        "Pan-Asian": {
          "count": 8,
          "sections": [
            {
              "label": "ASIAN STARTERS",
              "items": [
                {
                  "name": "Lemongrass Chicken Skewers",
                  "desc": "Grilled chicken marinated in lemongrass, ginger and lime, served with a tangy dipping sauce."
                },
                {
                  "name": "Crispy Salt & Pepper Squid",
                  "desc": "Golden fried squid rings tossed with crushed pepper, garlic and spring onion."
                },
                {
                  "name": "Vietnamese Summer Rolls",
                  "desc": "Fresh rice paper rolls with prawns, herbs and rice noodles, served with peanut dip."
                }
              ]
            },
            {
              "label": "THAI & MALAYSIAN MAINS",
              "items": [
                {
                  "name": "Green Curry with Jasmine Rice",
                  "desc": "Aromatic Thai green curry with chicken, bamboo shoots and basil in coconut milk."
                },
                {
                  "name": "Nasi Goreng",
                  "desc": "Malaysian style fried rice with shrimp paste, egg and crispy shallots."
                },
                {
                  "name": "Penang Char Kway Teow",
                  "desc": "Wok-fried flat rice noodles with prawns, egg and bean sprouts in dark soy."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 2,
    "name": "Lmnoq",
    "rating": 3.8,
    "cuisines": [
      "Continental",
      "Italian",
      "North Indian"
    ],
    "priceForTwo": 1700,
    "location": "Park Street Area, Kolkata",
    "distance": "2.6 km",
    "openingTime": "12:30pm",
    "offer": null,
    "image": "assets/food/images2.jpg",
    "menuData": {
      "restaurantId": 2,
      "restaurantName": "Lmnoq",
      "menu": {
        "Modern Italian": {
          "count": 7,
          "sections": [
            {
              "label": "ANTIPASTI",
              "items": [
                {
                  "name": "Burrata with Heirloom Tomatoes",
                  "desc": "Creamy burrata served over roasted heirloom tomatoes with basil oil."
                },
                {
                  "name": "Grilled Zucchini Carpaccio",
                  "desc": "Thinly sliced zucchini with shaved parmesan, pine nuts and lemon dressing."
                }
              ]
            },
            {
              "label": "HANDMADE PASTA",
              "items": [
                {
                  "name": "Truffle Mushroom Risotto",
                  "desc": "Slow-cooked arborio rice with wild mushrooms and a hint of black truffle oil."
                },
                {
                  "name": "Lobster Ravioli",
                  "desc": "House-made ravioli filled with lobster in a light saffron cream sauce."
                },
                {
                  "name": "Penne Arrabbiata",
                  "desc": "Penne tossed in a fiery tomato and chilli sauce with fresh garlic."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 3,
    "name": "Orange Lounge & Pub",
    "rating": null,
    "cuisines": [
      "Continental",
      "Asian"
    ],
    "priceForTwo": 2500,
    "location": "Camac Street Area, Kolkata",
    "distance": "3.4 km",
    "openingTime": "12 noon",
    "offer": "New",
    "image": "assets/food/images3.jpg",
    "menuData": {
      "restaurantId": 3,
      "restaurantName": "Orange Lounge & Pub",
      "menu": {
        "Pub Grub": {
          "count": 9,
          "sections": [
            {
              "label": "BAR BITES",
              "items": [
                {
                  "name": "Beer Battered Fish Fingers",
                  "desc": "Crispy beer-battered fish strips served with tartar sauce and lemon wedge."
                },
                {
                  "name": "Loaded Nachos",
                  "desc": "Tortilla chips piled with jalapenos, cheese sauce, salsa and sour cream."
                },
                {
                  "name": "Chicken Popcorn",
                  "desc": "Bite sized crispy fried chicken tossed in a smoky seasoning."
                }
              ]
            },
            {
              "label": "ASIAN FUSION PLATTERS",
              "items": [
                {
                  "name": "Dragon Chicken",
                  "desc": "Crispy chicken tossed in a sweet, spicy Szechuan style glaze topped with cashews."
                },
                {
                  "name": "Singapore Rice Noodles",
                  "desc": "Curry-spiced rice vermicelli stir-fried with vegetables and egg."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 4,
    "name": "The Flamboyant",
    "rating": 4.6,
    "cuisines": [
      "North Indian",
      "Chinese"
    ],
    "priceForTwo": 2000,
    "location": "Chowringhee, Kolkata",
    "distance": "2.4 km",
    "openingTime": "12 noon",
    "offer": "Flat 15% OFF",
    "image": "assets/food/images4.jpg",
    "menuData": {
      "restaurantId": 4,
      "restaurantName": "The Flamboyant",
      "menu": {
        "Indo-Chinese Grill": {
          "count": 10,
          "sections": [
            {
              "label": "TANDOOR SPECIALS",
              "items": [
                {
                  "name": "Tandoori Malai Chicken",
                  "desc": "Chicken marinated in cream, cheese and mild spices, roasted in the clay oven."
                },
                {
                  "name": "Amritsari Fish Tikka",
                  "desc": "Chunks of fish marinated in carom seed and gram flour, char-grilled."
                },
                {
                  "name": "Peshawari Mutton Chaap",
                  "desc": "Bone-in mutton ribs marinated overnight in a rich spiced yogurt."
                }
              ]
            },
            {
              "label": "WOK TOSSED FAVOURITES",
              "items": [
                {
                  "name": "Schezwan Chicken Dry",
                  "desc": "Wok tossed chicken in a fiery schezwan sauce with bell peppers."
                },
                {
                  "name": "Vegetable American Chopsuey",
                  "desc": "Crispy fried noodles topped with a sweet-sour mixed vegetable gravy."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 5,
    "name": "Rever Cafe",
    "rating": 4.3,
    "cuisines": [
      "North Indian",
      "Chinese",
      "Pizza"
    ],
    "priceForTwo": 1000,
    "location": "Dobson Road, Howrah",
    "distance": "3.1 km",
    "openingTime": "12 noon",
    "offer": null,
    "image": "assets/food/images5.jpg",
    "menuData": {
      "restaurantId": 5,
      "restaurantName": "Rever Cafe",
      "menu": {
        "Cafe & Comfort Food": {
          "count": 8,
          "sections": [
            {
              "label": "ALL DAY BREAKFAST",
              "items": [
                {
                  "name": "Classic Eggs Benedict",
                  "desc": "Poached eggs on toasted muffins with hollandaise sauce and grilled ham."
                },
                {
                  "name": "Belgian Waffles with Maple Syrup",
                  "desc": "Fluffy waffles served warm with butter and maple syrup."
                }
              ]
            },
            {
              "label": "COMFORT MAINS",
              "items": [
                {
                  "name": "Wood Fired Margherita Pizza",
                  "desc": "Thin crust pizza topped with fresh mozzarella, basil and tomato sauce."
                },
                {
                  "name": "Chicken Manchurian Gravy",
                  "desc": "Deep-fried chicken balls simmered in a tangy soy-ginger gravy."
                },
                {
                  "name": "Baked Mac and Cheese",
                  "desc": "Creamy macaroni baked with a blend of cheddar and mozzarella cheese."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 6,
    "name": "Corridor Bar & Kitchen",
    "rating": 4.4,
    "cuisines": [
      "North Indian",
      "Chinese"
    ],
    "priceForTwo": 1800,
    "location": "Chowringhee, Kolkata",
    "distance": "2.5 km",
    "openingTime": "2pm",
    "offer": "Flat 10% OFF",
    "image": "assets/food/images6.jpg",
    "menuData": {
      "restaurantId": 6,
      "restaurantName": "Corridor Bar & Kitchen",
      "menu": {
        "Bar & Kitchen Classics": {
          "count": 9,
          "sections": [
            {
              "label": "SMALL PLATES",
              "items": [
                {
                  "name": "Chicken Reshmi Kebab",
                  "desc": "Silky smooth chicken kebabs marinated in cream and cashew paste."
                },
                {
                  "name": "Chilli Paneer Dry",
                  "desc": "Cottage cheese cubes tossed with onions, capsicum in a spicy soy glaze."
                }
              ]
            },
            {
              "label": "CURRIES & MAINS",
              "items": [
                {
                  "name": "Kolkata Style Kosha Mangsho",
                  "desc": "Slow-cooked mutton curry in the traditional Bengali style with mustard oil."
                },
                {
                  "name": "Chicken Chilli Garlic Noodles",
                  "desc": "Stir-fried noodles with shredded chicken in a bold garlic chilli sauce."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 7,
    "name": "Pawan Putra",
    "rating": 4.4,
    "cuisines": [
      "North Indian",
      "Chinese"
    ],
    "priceForTwo": 1200,
    "location": "Kankurgachi, Kolkata",
    "distance": "2.8 km",
    "openingTime": "12 noon",
    "offer": "Flat 10% OFF",
    "image": "assets/food/images7.jpg",
    "menuData": {
      "restaurantId": 7,
      "restaurantName": "Pawan Putra",
      "menu": {
        "Home Style North Indian": {
          "count": 8,
          "sections": [
            {
              "label": "DAL & SABZI",
              "items": [
                {
                  "name": "Dal Tadka",
                  "desc": "Yellow lentils tempered with cumin, garlic and dried red chillies."
                },
                {
                  "name": "Kadai Paneer",
                  "desc": "Cottage cheese and bell peppers cooked in a coarsely ground spice masala."
                }
              ]
            },
            {
              "label": "ROTI & RICE",
              "items": [
                {
                  "name": "Lachha Paratha",
                  "desc": "Multi-layered flaky whole wheat flatbread cooked on a griddle."
                },
                {
                  "name": "Jeera Rice",
                  "desc": "Basmati rice tempered with roasted cumin seeds and ghee."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 8,
    "name": "Park Street Social",
    "rating": 4.4,
    "cuisines": [
      "North Indian",
      "Fast Food",
      "Continental"
    ],
    "priceForTwo": 1500,
    "location": "Park Street Area, Kolkata",
    "distance": "2.5 km",
    "openingTime": "11am",
    "offer": null,
    "image": "assets/food/images8.jpg",
    "menuData": {
      "restaurantId": 8,
      "restaurantName": "Park Street Social",
      "menu": {
        "Social Eats": {
          "count": 10,
          "sections": [
            {
              "label": "SOCIAL SIGNATURES",
              "items": [
                {
                  "name": "Peri Peri Loaded Fries",
                  "desc": "Crispy fries tossed in peri peri seasoning, topped with cheese sauce."
                },
                {
                  "name": "Grilled Chicken Sliders",
                  "desc": "Mini burger buns with grilled chicken patty, lettuce and chipotle mayo."
                }
              ]
            },
            {
              "label": "NORTH INDIAN THALI",
              "items": [
                {
                  "name": "Rajma Chawal",
                  "desc": "Red kidney beans slow-cooked in a tomato gravy, served with steamed rice."
                },
                {
                  "name": "Aloo Gobi Masala",
                  "desc": "Potatoes and cauliflower sauteed with turmeric, cumin and ginger."
                },
                {
                  "name": "Butter Naan",
                  "desc": "Soft leavened bread brushed with melted butter, baked in the tandoor."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 9,
    "name": "Hard Rock Cafe",
    "rating": 4.5,
    "cuisines": [
      "American",
      "Continental",
      "Italian"
    ],
    "priceForTwo": 2000,
    "location": "Park Street Area, Kolkata",
    "distance": "2.5 km",
    "openingTime": "12 noon",
    "offer": "Flat 10% OFF",
    "image": "assets/food/images9.jpg",
    "menuData": {
      "restaurantId": 9,
      "restaurantName": "Hard Rock Cafe",
      "menu": {
        "American Rock Grill": {
          "count": 9,
          "sections": [
            {
              "label": "LEGENDARY BURGERS",
              "items": [
                {
                  "name": "Legendary Classic Burger",
                  "desc": "Beef patty topped with lettuce, tomato, cheddar and signature rock sauce."
                },
                {
                  "name": "Smokehouse BBQ Burger",
                  "desc": "Grilled patty layered with crispy onions and smoky barbecue glaze."
                }
              ]
            },
            {
              "label": "GRILL & PASTA",
              "items": [
                {
                  "name": "Cajun Chicken Alfredo Pasta",
                  "desc": "Fettuccine tossed in creamy alfredo sauce with blackened cajun chicken."
                },
                {
                  "name": "Twisted Mac n Cheese",
                  "desc": "Rotini pasta baked with a three cheese blend and toasted breadcrumbs."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 10,
    "name": "Barbeque Nation",
    "rating": 4.3,
    "cuisines": [
      "North Indian",
      "BBQ"
    ],
    "priceForTwo": 1800,
    "location": "Salt Lake, Kolkata",
    "distance": "4.1 km",
    "openingTime": "12 noon",
    "offer": "Flat 20% OFF",
    "image": "assets/food/images10.jpg",
    "menuData": {
      "restaurantId": 10,
      "restaurantName": "Barbeque Nation",
      "menu": {
        "Live BBQ Buffet": {
          "count": 12,
          "sections": [
            {
              "label": "LIVE GRILL STARTERS",
              "items": [
                {
                  "name": "Kali Mirch Chicken Tikka",
                  "desc": "Black pepper marinated chicken cubes grilled fresh on the live counter."
                },
                {
                  "name": "Mutton Galouti Kebab",
                  "desc": "Melt-in-mouth minced mutton kebabs flavoured with a secret spice blend."
                },
                {
                  "name": "Tandoori Prawns",
                  "desc": "Jumbo prawns marinated in tandoori spices and cooked over open flame."
                }
              ]
            },
            {
              "label": "BUFFET MAINS & DESSERT",
              "items": [
                {
                  "name": "Mutton Rogan Josh",
                  "desc": "Kashmiri style mutton curry slow-cooked with aromatic whole spices."
                },
                {
                  "name": "Live Dosa Counter",
                  "desc": "Freshly made crispy dosas served hot with sambhar and chutneys."
                },
                {
                  "name": "Gulab Jamun with Ice Cream",
                  "desc": "Warm gulab jamuns served alongside a scoop of vanilla ice cream."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 11,
    "name": "Arsalan",
    "rating": 4.6,
    "cuisines": [
      "Mughlai",
      "Biryani"
    ],
    "priceForTwo": 1200,
    "location": "Park Circus, Kolkata",
    "distance": "3.2 km",
    "openingTime": "11am",
    "offer": null,
    "image": "assets/food/images11.jpg",
    "menuData": {
      "restaurantId": 11,
      "restaurantName": "Arsalan",
      "menu": {
        "Mughlai & Biryani House": {
          "count": 7,
          "sections": [
            {
              "label": "SIGNATURE BIRYANI",
              "items": [
                {
                  "name": "Kolkata Mutton Biryani",
                  "desc": "Fragrant basmati rice layered with slow-cooked mutton, potato and boiled egg."
                },
                {
                  "name": "Chicken Chaap Biryani",
                  "desc": "Aromatic biryani served alongside a rich, creamy chicken chaap curry."
                }
              ]
            },
            {
              "label": "MUGHLAI SIDES",
              "items": [
                {
                  "name": "Mutton Rezala",
                  "desc": "A delicate white gravy curry made with yogurt, cream and whole spices."
                },
                {
                  "name": "Beguni",
                  "desc": "Crispy gram flour battered eggplant fritters, a classic Bengali starter."
                },
                {
                  "name": "Mishti Doi",
                  "desc": "Traditional sweetened caramelised yogurt dessert served chilled."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 12,
    "name": "Peter Cat",
    "rating": 4.5,
    "cuisines": [
      "Continental",
      "North Indian"
    ],
    "priceForTwo": 2200,
    "location": "Park Street, Kolkata",
    "distance": "2.1 km",
    "openingTime": "12 noon",
    "offer": null,
    "image": "assets/food/images12.jpg",
    "menuData": {
      "restaurantId": 12,
      "restaurantName": "Peter Cat",
      "menu": {
        "Continental Classics": {
          "count": 8,
          "sections": [
            {
              "label": "SOUPS & SALADS",
              "items": [
                {
                  "name": "Cream of Mushroom Soup",
                  "desc": "Velvety mushroom soup finished with a swirl of fresh cream."
                },
                {
                  "name": "Classic Caesar Salad",
                  "desc": "Crisp romaine lettuce with parmesan shavings, croutons and caesar dressing."
                }
              ]
            },
            {
              "label": "OLD KOLKATA FAVOURITES",
              "items": [
                {
                  "name": "Chicken a la Kiev",
                  "desc": "Breaded chicken breast stuffed with garlic butter, fried till golden."
                },
                {
                  "name": "Devilled Crab",
                  "desc": "A vintage Kolkata classic of spiced crab meat baked in its shell."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 13,
    "name": "Wow! Momo",
    "rating": 4.2,
    "cuisines": [
      "Chinese",
      "Fast Food"
    ],
    "priceForTwo": 600,
    "location": "Multiple Outlets",
    "distance": "1.5 km",
    "openingTime": "10am",
    "offer": "Flat 10% OFF",
    "image": "assets/food/images13.jpg",
    "menuData": {
      "restaurantId": 13,
      "restaurantName": "Wow! Momo",
      "menu": {
        "Momo Specialist": {
          "count": 6,
          "sections": [
            {
              "label": "STEAMED MOMOS",
              "items": [
                {
                  "name": "Chicken Steam Momo",
                  "desc": "Soft dumplings filled with minced chicken, ginger and spring onion."
                },
                {
                  "name": "Paneer Steam Momo",
                  "desc": "Steamed dumplings stuffed with grated cottage cheese and herbs."
                }
              ]
            },
            {
              "label": "PAN FRIED & TANDOORI MOMOS",
              "items": [
                {
                  "name": "Peri Peri Pan Fried Momo",
                  "desc": "Crispy bottomed momos tossed in a tangy peri peri seasoning."
                },
                {
                  "name": "Tandoori Chicken Momo",
                  "desc": "Steamed momos char-grilled in tandoori marinade for a smoky finish."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 14,
    "name": "KFC",
    "rating": 4.1,
    "cuisines": [
      "Fast Food",
      "American"
    ],
    "priceForTwo": 800,
    "location": "City Centre, Kolkata",
    "distance": "2.7 km",
    "openingTime": "10am",
    "offer": null,
    "image": "assets/food/images14.jpg",
    "menuData": {
      "restaurantId": 14,
      "restaurantName": "KFC",
      "menu": {
        "Fried Chicken Specials": {
          "count": 7,
          "sections": [
            {
              "label": "SIGNATURE FRIED CHICKEN",
              "items": [
                {
                  "name": "Original Recipe Chicken Bucket",
                  "desc": "Crispy fried chicken pieces made with the classic secret spice blend."
                },
                {
                  "name": "Hot & Crispy Chicken",
                  "desc": "Extra spicy crunchy fried chicken with a fiery coating."
                }
              ]
            },
            {
              "label": "SNACKERS & SIDES",
              "items": [
                {
                  "name": "Zinger Burger",
                  "desc": "Spicy crispy chicken fillet burger with lettuce and mayo."
                },
                {
                  "name": "Popcorn Chicken Box",
                  "desc": "Bite sized crunchy chicken pieces tossed in seasoning."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 15,
    "name": "Domino's Pizza",
    "rating": 4.0,
    "cuisines": [
      "Pizza",
      "Fast Food"
    ],
    "priceForTwo": 900,
    "location": "Multiple Outlets",
    "distance": "2.0 km",
    "openingTime": "11am",
    "offer": "Buy 1 Get 1",
    "image": "assets/food/images15.jpg",
    "menuData": {
      "restaurantId": 15,
      "restaurantName": "Domino's Pizza",
      "menu": {
        "Pizza & Sides": {
          "count": 8,
          "sections": [
            {
              "label": "SIGNATURE PIZZAS",
              "items": [
                {
                  "name": "Peppy Paneer Pizza",
                  "desc": "Loaded with juicy paneer, capsicum and red pepper on a cheesy base."
                },
                {
                  "name": "Chicken Pepperoni Pizza",
                  "desc": "Classic pepperoni slices layered over melted mozzarella cheese."
                }
              ]
            },
            {
              "label": "SIDES & DIPS",
              "items": [
                {
                  "name": "Cheesy Garlic Breadsticks",
                  "desc": "Warm breadsticks topped with garlic butter and molten cheese."
                },
                {
                  "name": "Choco Lava Cake",
                  "desc": "Warm chocolate cake with a gooey molten centre."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 16,
    "name": "Mainland China",
    "rating": 4.4,
    "cuisines": [
      "Chinese"
    ],
    "priceForTwo": 2500,
    "location": "South City Mall, Kolkata",
    "distance": "5.3 km",
    "openingTime": "12 noon",
    "offer": null,
    "image": "assets/food/images16.jpg",
    "menuData": {
      "restaurantId": 16,
      "restaurantName": "Mainland China",
      "menu": {
        "Fine Chinese Dining": {
          "count": 9,
          "sections": [
            {
              "label": "DIM SUM & STARTERS",
              "items": [
                {
                  "name": "Crystal Prawn Dumplings",
                  "desc": "Steamed translucent dumplings filled with fresh prawn and chives."
                },
                {
                  "name": "Crispy Lotus Stem",
                  "desc": "Thinly sliced lotus root, fried crisp and tossed in a chilli glaze."
                }
              ]
            },
            {
              "label": "SIGNATURE MAINS",
              "items": [
                {
                  "name": "Peking Style Duck",
                  "desc": "Crispy roasted duck served with pancakes, spring onion and hoisin sauce."
                },
                {
                  "name": "Sizzling Black Pepper Beef",
                  "desc": "Tender beef strips stir-fried in a bold black pepper sauce, served sizzling."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 17,
    "name": "Baskin Robbins",
    "rating": 4.3,
    "cuisines": [
      "Desserts",
      "Ice Cream"
    ],
    "priceForTwo": 500,
    "location": "Park Street, Kolkata",
    "distance": "2.2 km",
    "openingTime": "11am",
    "offer": "Flat 15% OFF",
    "image": "assets/food/images17.jpg",
    "menuData": {
      "restaurantId": 17,
      "restaurantName": "Baskin Robbins",
      "menu": {
        "Ice Cream & Desserts": {
          "count": 6,
          "sections": [
            {
              "label": "SIGNATURE SUNDAES",
              "items": [
                {
                  "name": "Death by Chocolate Sundae",
                  "desc": "Layers of chocolate ice cream, brownie chunks and hot fudge sauce."
                },
                {
                  "name": "Mango Tango Sundae",
                  "desc": "Fresh mango scoops topped with mango sauce and whipped cream."
                }
              ]
            },
            {
              "label": "SHAKES & TUBS",
              "items": [
                {
                  "name": "Oreo Overload Shake",
                  "desc": "Thick vanilla shake blended with crushed Oreo cookies."
                },
                {
                  "name": "Family Pack Tub - Butterscotch",
                  "desc": "A generous tub of classic butterscotch ice cream to share at home."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 18,
    "name": "Cafe Coffee Day",
    "rating": 4.0,
    "cuisines": [
      "Cafe",
      "Beverages"
    ],
    "priceForTwo": 700,
    "location": "Salt Lake, Kolkata",
    "distance": "3.8 km",
    "openingTime": "9am",
    "offer": null,
    "image": "assets/food/images18.jpg",
    "menuData": {
      "restaurantId": 18,
      "restaurantName": "Cafe Coffee Day",
      "menu": {
        "Coffee & Beverages": {
          "count": 7,
          "sections": [
            {
              "label": "SIGNATURE COFFEES",
              "items": [
                {
                  "name": "Caramel Macchiato",
                  "desc": "Espresso layered with steamed milk and a drizzle of caramel syrup."
                },
                {
                  "name": "Hazelnut Cold Brew",
                  "desc": "Smooth cold brewed coffee infused with roasted hazelnut flavour."
                }
              ]
            },
            {
              "label": "SNACKS TO PAIR",
              "items": [
                {
                  "name": "Veg Grilled Sandwich",
                  "desc": "Toasted sandwich stuffed with fresh vegetables and mint chutney."
                },
                {
                  "name": "Chocolate Chip Muffin",
                  "desc": "Soft baked muffin loaded with chocolate chips."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 19,
    "name": "Haldiram's",
    "rating": 4.3,
    "cuisines": [
      "North Indian",
      "Snacks"
    ],
    "priceForTwo": 800,
    "location": "Esplanade, Kolkata",
    "distance": "2.0 km",
    "openingTime": "10am",
    "offer": null,
    "image": "assets/food/images19.jpg",
    "menuData": {
      "restaurantId": 19,
      "restaurantName": "Haldiram's",
      "menu": {
        "Indian Sweets & Snacks": {
          "count": 8,
          "sections": [
            {
              "label": "NAMKEEN & CHAAT",
              "items": [
                {
                  "name": "Raj Kachori",
                  "desc": "Crisp puffed shell filled with lentils, yogurt, chutneys and sev."
                },
                {
                  "name": "Aloo Tikki Chaat",
                  "desc": "Spiced potato patties topped with tangy tamarind and mint chutney."
                }
              ]
            },
            {
              "label": "SWEETS BOX",
              "items": [
                {
                  "name": "Kaju Katli",
                  "desc": "Diamond shaped cashew fudge with a delicate silver leaf topping."
                },
                {
                  "name": "Motichoor Ladoo",
                  "desc": "Fine gram flour pearls bound together with sugar syrup and ghee."
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    "id": 20,
    "name": "Subway",
    "rating": 4.1,
    "cuisines": [
      "Healthy Food",
      "Fast Food"
    ],
    "priceForTwo": 600,
    "location": "New Market, Kolkata",
    "distance": "2.3 km",
    "openingTime": "10am",
    "offer": "Flat 10% OFF",
    "image": "assets/food/images20.jpg",
    "menuData": {
      "restaurantId": 20,
      "restaurantName": "Subway",
      "menu": {
        "Healthy Subs": {
          "count": 7,
          "sections": [
            {
              "label": "SIGNATURE SUBS",
              "items": [
                {
                  "name": "Chicken Teriyaki Sub",
                  "desc": "Grilled chicken glazed in teriyaki sauce, packed with fresh veggies."
                },
                {
                  "name": "Veggie Delite Sub",
                  "desc": "A loaded sub with fresh lettuce, tomato, cucumber, olives and peppers."
                }
              ]
            },
            {
              "label": "SALADS & SIDES",
              "items": [
                {
                  "name": "Protein Chicken Salad Bowl",
                  "desc": "Grilled chicken over fresh greens with a light vinaigrette dressing."
                },
                {
                  "name": "Baked Jalapeno Cheese Bites",
                  "desc": "Crispy baked bites stuffed with jalapeno and melted cheese."
                }
              ]
            }
          ]
        }
      }
    }
  }
];

export function Main() {
  const [data,setData] = useState(dataGet);
  const {state }  = useContext(CounterContext);
  let navigate = useNavigate();

  useEffect(()=>{
    setData(state?.viewFoodItems);
    console.log(state);
  },[state])
  const goToItem = (index)=>{
    console.log(index);
    navigate("/food-item",{ state: data[index]?.menuData });
  }

  return (
    <div className="main-container">
      <CarouselCard/>
      <Banner/>
      <Filter/>
      <div className="grid m-116 mt-3">
        {data.map((data, index) => (
          <div className="card" key={index} onClick={()=>goToItem(index)}>
            <div className="image-container">
              <img src={data.image} alt={data.name} />

              {data.offer && <span className="offer">{data.offer}</span>}

              {data.rating && <span className="rating">{data.rating} ★</span>}
            </div>

            <div className="content">
              <div className="grid-header">
                <h3>{data.name}</h3>
                <span className="price">₹{data.priceForTwo} for two</span>
              </div>

              <p className="cuisines">{data.cuisines}</p>

              <div className="footer">
                <span>{data.location}</span>
                <span>{data.distance}</span>
              </div>

              <p className="timing">Opens at {data.openingTime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
