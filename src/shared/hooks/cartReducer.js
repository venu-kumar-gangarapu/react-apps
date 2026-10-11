const initialCart = {
    cartSize: 0,
    cartItem: [],
    totalCartValue: 0,
    currentRestarunt: ''
};

function isSameItem(a, b) {
    if (!a || !b) return false;
    const idA = a._id || a.id;
    const idB = b._id || b.id;
    if (idA && idB) {
        return idA === idB;
    }
    if (a.name && b.name) {
        return a.name === b.name;
    }
    return false;
}

function getItemPrice(item) {
    if (!item || item.price == null) return 0;
    if (typeof item.price === "number") return item.price;
    const parsed = parseFloat(String(item.price).replace(/[^0-9.]/g, ""));
    return isNaN(parsed) ? 0 : parsed;
}

function getItemQty(item) {
    const qty = Number(item?.quantity ?? item?.qty);
    return isNaN(qty) || qty <= 0 ? 1 : qty;
}

function getCartValue(cartItemsOrState) {
    const items = Array.isArray(cartItemsOrState)
        ? cartItemsOrState
        : cartItemsOrState?.cartItem || [];
    return items.reduce((sum, item) => {
        return sum + getItemPrice(item) * getItemQty(item);
    }, 0);
}

function calculateCartSize(cartItems) {
    return cartItems.reduce((sum, item) => sum + getItemQty(item), 0);
}

function cartReducer(state, action) {
    switch (action.type) {
        case "Add to Cart": {
            const itemToAdd = action.payload?.item || action.payload;
            if (!itemToAdd) return state;

            const restaurant =
                action.payload?.restaurant ||
                itemToAdd?.restaurant ||
                state.currentRestarunt ||
                '';

            const existingIndex = state.cartItem.findIndex((ci) =>
                isSameItem(ci, itemToAdd)
            );

            let updatedCartItem;
            if (existingIndex !== -1) {
                const existingItem = state.cartItem[existingIndex];
                const currentQty = getItemQty(existingItem);
                const addQty = getItemQty(itemToAdd);
                const newQty = currentQty + addQty;

                updatedCartItem = state.cartItem.map((ci, idx) => {
                    if (idx === existingIndex) {
                        return {
                            ...ci,
                            quantity: newQty,
                            qty: newQty,
                        };
                    }
                    return ci;
                });
            } else {
                const initialQty = getItemQty(itemToAdd);
                updatedCartItem = [
                    ...state.cartItem,
                    {
                        ...itemToAdd,
                        quantity: initialQty,
                        qty: initialQty,
                    },
                ];
            }

            return {
                ...state,
                currentRestarunt: restaurant,
                cartSize: calculateCartSize(updatedCartItem),
                cartItem: updatedCartItem,
                totalCartValue: getCartValue(updatedCartItem),
            };
        }

        case "Remove from Cart": {
            const payload = action.payload;
            let targetIndex = -1;

            if (typeof payload === "number") {
                targetIndex = payload;
            } else if (payload?.index !== undefined) {
                targetIndex = payload.index;
            } else if (payload) {
                const targetItem = payload?.item || payload;
                targetIndex = state.cartItem.findIndex((ci) =>
                    isSameItem(ci, targetItem)
                );
            }

            if (targetIndex < 0 || targetIndex >= state.cartItem.length) {
                return state;
            }

            const itemToRemove = state.cartItem[targetIndex];
            const currentQty = getItemQty(itemToRemove);

            let updatedCartItem;
            if (currentQty > 1 && !payload?.removeAll) {
                const newQty = currentQty - 1;
                updatedCartItem = state.cartItem.map((ci, idx) => {
                    if (idx === targetIndex) {
                        return {
                            ...ci,
                            quantity: newQty,
                            qty: newQty,
                        };
                    }
                    return ci;
                });
            } else {
                updatedCartItem = state.cartItem.filter(
                    (_, idx) => idx !== targetIndex
                );
            }

            return {
                ...state,
                currentRestarunt:
                    updatedCartItem.length === 0 ? '' : state.currentRestarunt,
                cartSize: calculateCartSize(updatedCartItem),
                cartItem: updatedCartItem,
                totalCartValue: getCartValue(updatedCartItem),
            };
        }

        case "total cart value":
            return {
                ...state,
                totalCartValue: getCartValue(state.cartItem),
            };

        case "empty cart":
            return { ...initialCart };

        default:
            return state;
    }
}

export { initialCart, cartReducer, getCartValue };