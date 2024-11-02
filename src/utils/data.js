export const orders = [
    {
        id: '1',
        customerName: 'Nick Adams',
        location: '123 Main St, Springfield',
        orderDescription: 'Apples, Orange Juice',
        deliveryTime: '2:00 PM',
        price: '₹15.00',
        paymentStatus: {
            method: 'COD',
            details: {
                paidVia: 'Cash',
                amount: '₹15.00',
            }
        },
        deliveryDate: '02/11/2024',
    },
    {
        id: '2',
        customerName: 'Jane Doe',
        location: '456 Elm St, Springfield',
        orderDescription: 'Bananas, Milk',
        deliveryTime: '3:30 PM',
        price: '₹20.00',
        paymentStatus: {
            method: 'UPI',
            details: null,
        },
        deliveryDate: '02/11/2024',
    },
    {
        id: '3',
        customerName: 'Michael Smith',
        location: '789 Oak St, Springfield',
        orderDescription: 'Bread, Eggs',
        deliveryTime: '11:00 AM',
        price: '₹10.00',
        paymentStatus: {
            method: 'COD',
            details: {
                paidVia: 'UPI',
                amount: '₹10.00',
            }
        },
        deliveryDate: '02/11/2024',
    },
    {
        id: '4',
        customerName: 'Emily Clark',
        location: '321 Pine St, Springfield',
        orderDescription: 'Chicken, Rice',
        deliveryTime: '5:45 PM',
        price: '₹30.00',
        paymentStatus: {
            method: 'UPI',
            details: null,
        },
        deliveryDate: '03/11/2024',
    },
    {
        id: '5',
        customerName: 'William Brown',
        location: '654 Maple St, Springfield',
        orderDescription: 'Pasta, Tomato Sauce',
        deliveryTime: '12:00 PM',
        price: '₹25.00',
        paymentStatus: {
            method: 'COD',
            details: {
                paidVia: 'Cash',
                amount: '₹25.00',
            }
        },
        deliveryDate: '04/11/2024',
    },
    {
        id: '6',
        customerName: 'Sophia White',
        location: '987 Willow St, Springfield',
        orderDescription: 'Fish, Vegetables',
        deliveryTime: '1:00 PM',
        price: '₹40.00',
        paymentStatus: {
            method: 'UPI',
            details: null,
        },
        deliveryDate: '04/11/2024',
    },
    {
        id: '7',
        customerName: 'Liam Green',
        location: '111 Cedar St, Springfield',
        orderDescription: 'Coffee, Sugar',
        deliveryTime: '9:00 AM',
        price: '₹12.00',
        paymentStatus: {
            method: 'COD',
            details: {
                paidVia: 'Cash',
                amount: '₹12.00',
            }
        },
        deliveryDate: '05/11/2024',
    },
    {
        id: '8',
        customerName: 'Olivia Blue',
        location: '222 Birch St, Springfield',
        orderDescription: 'Tea, Biscuits',
        deliveryTime: '10:30 AM',
        price: '₹8.00',
        paymentStatus: {
            method: 'UPI',
            details: null,
        },
        deliveryDate: '05/11/2024',
    },
    {
        id: '9',
        customerName: 'James Black',
        location: '333 Walnut St, Springfield',
        orderDescription: 'Yogurt, Berries',
        deliveryTime: '7:30 AM',
        price: '₹18.00',
        paymentStatus: {
            method: 'COD',
            details: {
                paidVia: 'Cash',
                amount: '₹18.00',
            }
        },
        deliveryDate: '06/11/2024',
    },
    {
        id: '10',
        customerName: 'Emma Brown',
        location: '444 Fir St, Springfield',
        orderDescription: 'Butter, Bread',
        deliveryTime: '4:00 PM',
        price: '₹15.00',
        paymentStatus: {
            method: 'UPI',
            details: null,
        },
        deliveryDate: '06/11/2024',
    },
    {
        id: '11',
        customerName: 'Noah White',
        location: '555 Chestnut St, Springfield',
        orderDescription: 'Carrots, Potatoes',
        deliveryTime: '6:00 PM',
        price: '₹10.00',
        paymentStatus: {
            method: 'COD',
            details: {
                paidVia: 'UPI',
                amount: '₹10.00',
            }
        },
        deliveryDate: '07/11/2024',
    },
    {
        id: '12',
        customerName: 'Ava Gray',
        location: '666 Redwood St, Springfield',
        orderDescription: 'Pork, Cabbage',
        deliveryTime: '11:30 AM',
        price: '₹35.00',
        paymentStatus: {
            method: 'COD',
            details: {
                paidVia: 'Cash',
                amount: '₹35.00',
            }
        },
        deliveryDate: '07/11/2024',
    },
    {
        id: '13',
        customerName: 'Lucas Lee',
        location: '777 Spruce St, Springfield',
        orderDescription: 'Grapes, Bananas',
        deliveryTime: '8:15 AM',
        price: '₹9.00',
        paymentStatus: {
            method: 'UPI',
            details: null,
        },
        deliveryDate: '08/11/2024',
    },
    {
        id: '14',
        customerName: 'Isabella Gold',
        location: '888 Aspen St, Springfield',
        orderDescription: 'Lettuce, Cucumbers',
        deliveryTime: '3:45 PM',
        price: '₹7.00',
        paymentStatus: {
            method: 'COD',
            details: {
                paidVia: 'Cash',
                amount: '₹7.00',
            }
        },
        deliveryDate: '08/11/2024',
    },
    {
        id: '15',
        customerName: 'Elijah King',
        location: '999 Cedar St, Springfield',
        orderDescription: 'Pizza Dough, Cheese',
        deliveryTime: '5:30 PM',
        price: '₹22.00',
        paymentStatus: {
            method: 'UPI',
            details: null,
        },
        deliveryDate: '09/11/2024',
    },
    {
        id: '16',
        customerName: 'Mia Robinson',
        location: '123 Maple St, Springfield',
        orderDescription: 'Chicken Breast, Broccoli',
        deliveryTime: '7:00 PM',
        price: '₹30.00',
        paymentStatus: {
            method: 'COD',
            details: {
                paidVia: 'UPI',
                amount: '₹30.00',
            }
        },
        deliveryDate: '09/11/2024',
    },
    {
        id: '17',
        customerName: 'Benjamin Wright',
        location: '124 Oak St, Springfield',
        orderDescription: 'Chips, Dip',
        deliveryTime: '12:30 PM',
        price: '₹5.00',
        paymentStatus: {
            method: 'COD',
            details: {
                paidVia: 'Cash',
                amount: '₹5.00',
            }
        },
        deliveryDate: '10/11/2024',
    },
    {
        id: '18',
        customerName: 'Charlotte Hill',
        location: '125 Pine St, Springfield',
        orderDescription: 'Watermelon, Pineapple',
        deliveryTime: '2:00 PM',
        price: '₹20.00',
        paymentStatus: {
            method: 'UPI',
            details: null,
        },
        deliveryDate: '10/11/2024',
    },
    {
        id: '19',
        customerName: 'Henry Carter',
        location: '126 Birch St, Springfield',
        orderDescription: 'Ice Cream, Soda',
        deliveryTime: '6:15 PM',
        price: '₹12.00',
        paymentStatus: {
            method: 'COD',
            details: {
                paidVia: 'Cash',
                amount: '₹12.00',
            }
        },
        deliveryDate: '11/11/2024',
    },
    {
        id: '20',
        customerName: 'Amelia Martin',
        location: '127 Walnut St, Springfield',
        orderDescription: 'Chicken Wings, Sauce',
        deliveryTime: '7:45 PM',
        price: '₹28.00',
        paymentStatus: {
            method: 'UPI',
            details: null,
        },
        deliveryDate: '11/11/2024',
    },
];