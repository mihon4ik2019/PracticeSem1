// Инициализация Redux хранилища
const { createStore, applyMiddleware, combineReducers } = Redux;
const { Provider, useSelector, useDispatch } = ReactRedux;
const thunk = ReduxThunk.default;

// Начальное состояние
const initialState = {
  products: [],
  theme: 'light'
};

// Редуктор
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
}

// Создание хранилища
const store = createStore(rootReducer, applyMiddleware(thunk));

// Действия
const fetchProducts = () => async (dispatch) => {
  const response = await fetch('http://localhost:8080/products');
  const data = await response.json();
  dispatch({ type: 'SET_PRODUCTS', payload: data });
};

const toggleTheme = () => ({ type: 'TOGGLE_THEME' });

// Компонент списка товаров
function ProductList() {
  const products = useSelector(state => state.products);
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className={`product-list ${theme}`}>
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>Price: {product.price} руб.</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}

// Компонент переключения темы
function ThemeToggle() {
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();

  return (
    <button 
      onClick={() => dispatch(toggleTheme())}
      className={`theme-toggle ${theme}`}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
  );
}

// Главный компонент
function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>Product Catalog</h1>
        <ThemeToggle />
        <ProductList />
      </div>
    </Provider>
  );
}

// Рендерим приложение
ReactDOM.createRoot(document.getElementById('root')).render(<App />);