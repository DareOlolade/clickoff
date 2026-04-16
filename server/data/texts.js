const typingTexts = {
  quotes: [
    "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it. And, like any great relationship, it just gets better and better as the years roll on. So keep looking until you find it.",
    
    "Innovation distinguishes between a leader and a follower. Stay hungry, stay foolish. Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma which is living with the results of other people's thinking. Don't let the noise of others' opinions drown out your own inner voice.",
    
    "Success is not final, failure is not fatal: it is the courage to continue that counts. Never give in except to convictions of honor and good sense. We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets, we shall never surrender.",
    
    "The future belongs to those who believe in the beauty of their dreams. Do what you feel in your heart to be right for you'll be criticized anyway. No one can make you feel inferior without your consent. Great minds discuss ideas; average minds discuss events; small minds discuss people.",
    
    "I have not failed. I've just found ten thousand ways that won't work. Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time. Genius is one percent inspiration and ninety-nine percent perspiration. Opportunity is missed by most people because it is dressed in overalls.",
    
    "Be the change that you wish to see in the world. Live as if you were to die tomorrow. Learn as if you were to live forever. An eye for an eye only ends up making the whole world blind. The weak can never forgive. Forgiveness is the attribute of the strong.",
    
    "In the middle of difficulty lies opportunity. Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world. The important thing is not to stop questioning. Curiosity has its own reason for existence. Try not to become a man of success, but rather try to become a man of value.",
    
    "The only impossible journey is the one you never begin. Believe you can and you're halfway there. Do what you can, with what you have, where you are. It is hard to fail, but it is worse never to have tried to succeed. The credit belongs to the man who is actually in the arena.",
    
    "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that. I have a dream that one day this nation will rise up and live out the true meaning of its creed. Injustice anywhere is a threat to justice everywhere.",
    
    "What we think, we become. All that we are arises with our thoughts. With our thoughts, we make the world. The mind is everything. Peace comes from within. Do not seek it without. You yourself, as much as anybody in the entire universe, deserve your love and affection.",
    
    "Excellence is not a destination; it is a continuous journey that never ends. We are what we repeatedly do. Excellence, then, is not an act, but a habit. Quality is not an act, it is a habit. The whole is greater than the sum of its parts. Knowing yourself is the beginning of all wisdom.",
    
    "The best way to predict the future is to create it. The future depends on what you do today. Action is the foundational key to all success. The path to success is to take massive, determined action. Do not wait to strike till the iron is hot; but make it hot by striking.",
    
    "Alone we can do so little; together we can do so much. Coming together is a beginning, staying together is progress, and working together is success. Teamwork makes the dream work. Individual commitment to a group effort is what makes a team work. Unity is strength. When there is teamwork wonderful things can be achieved.",
    
    "Education is the most powerful weapon which you can use to change the world. The beautiful thing about learning is that no one can take it away from you. Tell me and I forget. Teach me and I remember. Involve me and I learn. An investment in knowledge pays the best interest.",
    
    "Courage is not the absence of fear, but rather the assessment that something else is more important than fear. You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face. The brave man is not he who does not feel afraid, but he who conquers that fear.",
    
    "Change is the only constant in life. The only way to make sense out of change is to plunge into it, move with it, and join the dance. Progress is impossible without change, and those who cannot change their minds cannot change anything. To improve is to change; to be perfect is to change often.",
    
    "Time is what we want most, but what we use worst. Lost time is never found again. Don't count the days, make the days count. The best time to plant a tree was twenty years ago. The second best time is now. Yesterday is history, tomorrow is a mystery, today is a gift.",
    
    "Simplicity is the ultimate sophistication. Life is really simple, but we insist on making it complicated. The ability to simplify means to eliminate the unnecessary so that the necessary may speak. Making the simple complicated is commonplace; making the complicated simple, that's creativity. Less is more.",
    
    "Knowledge is power. An investment in knowledge pays the best interest. The only source of knowledge is experience. Knowledge speaks, but wisdom listens. True knowledge exists in knowing that you know nothing. Share your knowledge. It is a way to achieve immortality. Information is not knowledge. The greatest enemy of knowledge is ignorance.",
    
    "Focus on being productive instead of busy. The successful warrior is the average man, with laser-like focus. Stay focused, go after your dreams and keep moving toward your goals. Where focus goes, energy flows. Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus.",
    
    "A goal without a plan is just a wish. Vision without action is merely a dream. Action without vision just passes the time. By failing to prepare, you are preparing to fail. Plans are nothing; planning is everything. Setting goals is the first step in turning the invisible into the visible. Good fortune happens when opportunity meets planning.",
    
    "Keep your face always toward the sunshine and shadows will fall behind you. Positive thinking will let you do everything better than negative thinking will. Once you replace negative thoughts with positive ones, you'll start having positive results. Your attitude, not your aptitude, will determine your altitude. Positive anything is better than negative nothing.",
    
    "It always seems impossible until it's done. Perseverance is not a long race; it is many short races one after the other. Success is the sum of small efforts repeated day in and day out. Fall seven times and stand up eight. Energy and persistence conquer all things. Never give in except to good sense.",
    
    "Creativity is intelligence having fun. Every artist was first an amateur. Art is not what you see, but what you make others see. You can't use up creativity. The more you use, the more you have. Creativity takes courage. The purpose of art is washing the dust of daily life off our souls.",
    
    "A leader is one who knows the way, goes the way, and shows the way. Leadership is not about being in charge. It's about taking care of those in your charge. The function of leadership is to produce more leaders, not more followers. Before you are a leader, success is all about growing yourself.",
    
    "Failure is simply the opportunity to begin again, this time more intelligently. Success is stumbling from failure to failure with no loss of enthusiasm. Only those who dare to fail greatly can ever achieve greatly. There is no failure except in no longer trying. The only real mistake is the one from which we learn nothing.",
    
    "Dream big and dare to fail. The biggest risk is not taking any risk. In a world that is changing quickly, the only strategy that is guaranteed to fail is not taking risks. If you are not willing to risk the usual, you will have to settle for the ordinary. Take risks and be bold.",
    
    "Hard work beats talent when talent doesn't work hard. The only place where success comes before work is in the dictionary. There are no shortcuts to any place worth going. Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing.",
    
    "Your life does not get better by chance, it gets better by change. If you want something you have never had, you must be willing to do something you have never done. Change your life today. Don't gamble on the future, act now, without delay. The secret of change is to focus energy not on fighting the old.",
    
    "Opportunities don't happen. You create them. Don't wait for opportunity. Create it. Success is where preparation and opportunity meet. When one door closes, another opens; but we often look so long and so regretfully upon the closed door that we do not see the one which has opened for us.",
    
    "The difference between ordinary and extraordinary is that little extra. Success is doing ordinary things extraordinarily well. The only limit to our realization of tomorrow will be our doubts of today. What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. You are never too old to set another goal or to dream a new dream. The only person you are destined to become is the person you decide to be. You are braver than you believe.",
    
    "Don't watch the clock; do what it does. Keep going. The way to get started is to quit talking and begin doing. You don't have to be great to start, but you have to start to be great. The secret of getting ahead is getting started. Action is the foundational key to all success.",
    
    "It does not matter how slowly you go as long as you do not stop. Success is not how high you have climbed, but how you make a positive difference to the world. The only impossible journey is the one you never begin. Start where you are. Use what you have. Do what you can. Every accomplishment starts with the decision to try.",
    
    "The mind is not a vessel to be filled, but a fire to be kindled. Intelligence without ambition is a bird without wings. The beautiful thing about learning is nobody can take it away from you. Education is not preparation for life; education is life itself. Live as if you were to die tomorrow. Learn as if you were to live forever.",
    
    "What you get by achieving your goals is not as important as what you become by achieving your goals. Setting goals is the first step in turning the invisible into the visible. A goal properly set is halfway reached. You are never too old to set another goal or to dream a new dream. Goals are dreams with deadlines.",
    
    "The only way to achieve the impossible is to believe it is possible. Whether you think you can or you think you can't, you're right. If you can dream it, you can do it. The future belongs to those who believe in the beauty of their dreams. Everything you can imagine is real. Imagination is everything.",
    
    "Success usually comes to those who are too busy to be looking for it. Don't be afraid to give up the good to go for the great. I find that the harder I work, the more luck I seem to have. The road to success and the road to failure are almost exactly the same. Success is walking from failure to failure.",
    
    "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. The only way to do great work is to love what you do. Choose a job you love, and you will never have to work a day in your life.",
    
    "In order to succeed, we must first believe that we can. All our dreams can come true if we have the courage to pursue them. The only limit to our realization of tomorrow will be our doubts of today. Believe you can and you're halfway there. With self-discipline most anything is possible. Success is a state of mind.",
    
    "The successful warrior is the average man, with laser-like focus. Concentrate all your thoughts upon the work at hand. Where focus goes, energy flows. Focus on being productive instead of busy. Stay focused, go after your dreams and keep moving toward your goals. The key to success is to focus on goals, not obstacles.",
    
    "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart. Everything you've ever wanted is on the other side of fear. Do one thing every day that scares you. Fear is only as deep as the mind allows. Courage is not the absence of fear, but triumph over it.",
    
    "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty. When everything seems to be going against you, remember that the airplane takes off against the wind, not with it. Difficult roads often lead to beautiful destinations. The greater the obstacle, the more glory in overcoming it.",
    
    "Life is ten percent what happens to you and ninety percent how you react to it. We cannot change the cards we are dealt, just how we play the hand. When we are no longer able to change a situation, we are challenged to change ourselves. The only way out is through. This too shall pass.",
    
    "Small daily improvements over time lead to stunning results. Success is the sum of small efforts repeated day in and day out. A little progress each day adds up to big results. Don't despise small beginnings. Great things have small beginnings. The journey of a thousand miles begins with a single step.",
    
    "Be yourself; everyone else is already taken. To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. Imperfection is beauty, madness is genius and it's better to be absolutely ridiculous than absolutely boring. Be who you are and say what you feel, because those who mind don't matter.",
    
    "Quality is not an act, it is a habit. We are what we repeatedly do. Excellence, then, is not an act, but a habit. First we make our habits, then our habits make us. The chains of habit are too weak to be felt until they are too strong to be broken. Motivation is what gets you started. Habit is what keeps you going.",
    
    "The best revenge is massive success. Living well is the best revenge. Success is the sweetest revenge. Don't get mad, get better. The best way to predict your future is to create it. Your success is the best revenge for anything. Show them what they missed out on by becoming successful without them.",
    
    "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway. A year from now you may wish you had started today. The best time to plant a tree was twenty years ago. The second best time is now. Don't count the days, make the days count.",
    
    "Happiness is not something ready made. It comes from your own actions. The purpose of our lives is to be happy. Happiness is when what you think, what you say, and what you do are in harmony. The happiest people don't have the best of everything, they make the best of everything. Choose to be happy.",
  ],

  code: [
    "const numbers = [1, 2, 3, 4, 5]; const doubled = numbers.map(n => n * 2); const evens = numbers.filter(n => n % 2 === 0); const sum = numbers.reduce((acc, n) => acc + n, 0); const found = numbers.find(n => n > 3); const hasEven = numbers.some(n => n % 2 === 0);",
    
    "async function fetchUser(id) { try { const response = await fetch(`/api/users/${id}`); const data = await response.json(); return data; } catch (error) { console.error('Error fetching user:', error); throw error; } } fetchUser(1).then(user => console.log(user));",
    
    "const user = { name: 'John', age: 30, email: 'john@example.com' }; const { name, age } = user; const numbers = [1, 2, 3, 4, 5]; const [first, second, ...rest] = numbers; const { email: userEmail } = user; console.log(name, age, first, rest);",
    
    "const add = (a, b) => a + b; const square = x => x * x; const greet = name => `Hello, ${name}!`; const multiply = (a, b) => { const result = a * b; return result; }; const numbers = [1, 2, 3].map(n => n * 2);",
    
    "const promise = new Promise((resolve, reject) => { setTimeout(() => { const success = true; if (success) resolve('Success!'); else reject('Failed'); }, 1000); }); promise.then(result => console.log(result)).catch(error => console.error(error)).finally(() => console.log('Done'));",
    
    "numbers = [1, 2, 3, 4, 5]; squares = [x**2 for x in numbers]; evens = [x for x in numbers if x % 2 == 0]; matrix = [[i*j for j in range(5)] for i in range(5)]; words = ['hello', 'world']; upper = [w.upper() for w in words];",
    
    "def fibonacci(n): if n <= 1: return n; return fibonacci(n-1) + fibonacci(n-2); def factorial(n): return 1 if n <= 1 else n * factorial(n-1); def is_prime(n): if n < 2: return False; for i in range(2, int(n**0.5) + 1): if n % i == 0: return False; return True;",
    
    "class Person: def __init__(self, name, age): self.name = name; self.age = age; def greet(self): return f'Hello, I am {self.name}'; def birthday(self): self.age += 1; person = Person('Alice', 25); print(person.greet()); person.birthday();",
    
    "def timer(func): import time; def wrapper(*args, **kwargs): start = time.time(); result = func(*args, **kwargs); end = time.time(); print(f'Time: {end - start}'); return result; return wrapper; @timer; def slow_function(): time.sleep(1); return 'Done';",
    
    "class FileManager: def __init__(self, filename, mode): self.filename = filename; self.mode = mode; def __enter__(self): self.file = open(self.filename, self.mode); return self.file; def __exit__(self, exc_type, exc_val, exc_tb): self.file.close(); with FileManager('test.txt', 'w') as f: f.write('Hello');",
    
    "public class Car { private String brand; private int year; public Car(String brand, int year) { this.brand = brand; this.year = year; } public void start() { System.out.println('Car starting'); } public String getBrand() { return brand; } } Car myCar = new Car('Toyota', 2020);",
    
    "List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5); List<Integer> doubled = numbers.stream().map(n -> n * 2).collect(Collectors.toList()); int sum = numbers.stream().reduce(0, Integer::sum); boolean hasEven = numbers.stream().anyMatch(n -> n % 2 == 0);",
    
    "interface Animal { void makeSound(); void eat(); } class Dog implements Animal { public void makeSound() { System.out.println('Woof'); } public void eat() { System.out.println('Eating'); } } Dog myDog = new Dog(); myDog.makeSound(); myDog.eat();",
    
    "template<typename T> T max(T a, T b) { return (a > b) ? a : b; } template<typename T> class Stack { private: vector<T> elements; public: void push(T const& elem) { elements.push_back(elem); } T pop() { T elem = elements.back(); elements.pop_back(); return elem; } };",
    
    "auto add = [](int a, int b) { return a + b; }; vector<int> nums = {1, 2, 3, 4, 5}; for_each(nums.begin(), nums.end(), [](int n) { cout << n * 2 << endl; }); auto square = [](int x) { return x * x; };",
    
    "unique_ptr<int> ptr1 = make_unique<int>(42); shared_ptr<int> ptr2 = make_shared<int>(100); weak_ptr<int> ptr3 = ptr2; auto value = *ptr1; ptr1.reset(); if (auto sp = ptr3.lock()) { cout << *sp << endl; }",
    
    "interface User { id: number; name: string; email?: string; } function getUser(id: number): User { return { id, name: 'John' }; } const users: User[] = []; type Point = { x: number; y: number }; interface Response<T> { data: T; status: number; }",
    
    "function identity<T>(arg: T): T { return arg; } class Box<T> { private value: T; constructor(value: T) { this.value = value; } getValue(): T { return this.value; } } const box = new Box<number>(42); const result = identity<string>('hello');",
    
    "enum Direction { Up, Down, Left, Right } enum Status { Pending = 'PENDING', Approved = 'APPROVED', Rejected = 'REJECTED' } let dir: Direction = Direction.Up; let status: Status = Status.Pending; console.log(dir, status);",
    
    "func worker(id int, jobs <-chan int, results chan<- int) { for j := range jobs { results <- j * 2; } } func main() { jobs := make(chan int, 100); results := make(chan int, 100); for w := 1; w <= 3; w++ { go worker(w, jobs, results); } }",
    
    "type Rectangle struct { width, height float64; } func (r Rectangle) Area() float64 { return r.width * r.height; } func (r *Rectangle) Scale(factor float64) { r.width *= factor; r.height *= factor; } rect := Rectangle{width: 10, height: 5}; area := rect.Area();",
    
    "type Shape interface { Area() float64; Perimeter() float64; } type Circle struct { radius float64; } func (c Circle) Area() float64 { return 3.14 * c.radius * c.radius; } func (c Circle) Perimeter() float64 { return 2 * 3.14 * c.radius; }",
    
    "fn main() { let s1 = String::from('hello'); let s2 = s1; let s3 = s2.clone(); let x = 5; let y = x; println!('{}', s3); } fn take_ownership(s: String) { println!('{}', s); } fn makes_copy(x: i32) { println!('{}', x); }",
    
    "enum Message { Quit, Move { x: i32, y: i32 }, Write(String), } fn process(msg: Message) { match msg { Message::Quit => println!('Quit'), Message::Move { x, y } => println!('Move to {}, {}', x, y), Message::Write(text) => println!('{}', text), } }",
    
    "fn divide(a: f64, b: f64) -> Result<f64, String> { if b == 0.0 { return Err(String::from('Division by zero')); } Ok(a / b) } match divide(10.0, 2.0) { Ok(result) => println!('Result: {}', result), Err(e) => println!('Error: {}', e), }",
    
    "SELECT users.name, COUNT(orders.id) as order_count FROM users LEFT JOIN orders ON users.id = orders.user_id WHERE users.created_at > '2020-01-01' GROUP BY users.id HAVING COUNT(orders.id) > 5 ORDER BY order_count DESC LIMIT 10;",
    
    "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees); SELECT department, (SELECT COUNT(*) FROM employees e WHERE e.dept_id = d.id) as emp_count FROM departments d; DELETE FROM orders WHERE created_at < (SELECT DATE_SUB(NOW(), INTERVAL 1 YEAR));",
    
    "SELECT name, salary, department, AVG(salary) OVER (PARTITION BY department) as dept_avg, RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank, ROW_NUMBER() OVER (ORDER BY salary DESC) as row_num FROM employees;",
    
    "import { useState, useEffect } from 'react'; function Counter() { const [count, setCount] = useState(0); useEffect(() => { document.title = `Count: ${count}`; }, [count]); return <button onClick={() => setCount(count + 1)}>Count: {count}</button>; }",
    
    "function useLocalStorage(key, initialValue) { const [value, setValue] = useState(() => { const item = localStorage.getItem(key); return item ? JSON.parse(item) : initialValue; }); useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]); return [value, setValue]; }",
    
    "const ThemeContext = React.createContext('light'); function App() { return <ThemeContext.Provider value='dark'><Toolbar /></ThemeContext.Provider>; } function Toolbar() { const theme = useContext(ThemeContext); return <div style={{ background: theme === 'dark' ? '#000' : '#fff' }}>Theme: {theme}</div>; }",
    
    "const express = require('express'); const app = express(); app.use(express.json()); app.get('/users', (req, res) => { res.json({ users: [] }); }); app.post('/users', (req, res) => { const user = req.body; res.status(201).json(user); }); app.listen(3000);",
    
    "const logger = (req, res, next) => { console.log(`${req.method} ${req.url}`); next(); }; const auth = (req, res, next) => { const token = req.headers.authorization; if (!token) return res.status(401).json({ error: 'Unauthorized' }); next(); }; app.use(logger); app.use(auth);",
    
    "const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/; const phoneRegex = /^\\+?[1-9]\\d{1,14}$/; const urlRegex = /^(https?:\\/\\/)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b/; const hexColor = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;",
    
    "function binarySearch(arr, target) { let left = 0, right = arr.length - 1; while (left <= right) { const mid = Math.floor((left + right) / 2); if (arr[mid] === target) return mid; if (arr[mid] < target) left = mid + 1; else right = mid - 1; } return -1; }",
    
    "class Node { constructor(data) { this.data = data; this.next = null; } } class LinkedList { constructor() { this.head = null; } append(data) { const node = new Node(data); if (!this.head) { this.head = node; return; } let current = this.head; while (current.next) current = current.next; current.next = node; } }",
    
    "class Stack { constructor() { this.items = []; } push(element) { this.items.push(element); } pop() { return this.items.pop(); } peek() { return this.items[this.items.length - 1]; } isEmpty() { return this.items.length === 0; } size() { return this.items.length; } }",
    
    "class Queue { constructor() { this.items = []; } enqueue(element) { this.items.push(element); } dequeue() { return this.items.shift(); } front() { return this.items[0]; } isEmpty() { return this.items.length === 0; } size() { return this.items.length; } }",
    
    "function bubbleSort(arr) { const n = arr.length; for (let i = 0; i < n - 1; i++) { for (let j = 0; j < n - i - 1; j++) { if (arr[j] > arr[j + 1]) { [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; } } } return arr; }",
    
    "function quickSort(arr) { if (arr.length <= 1) return arr; const pivot = arr[0]; const left = arr.slice(1).filter(x => x < pivot); const right = arr.slice(1).filter(x => x >= pivot); return [...quickSort(left), pivot, ...quickSort(right)]; }",
    
    "function mergeSort(arr) { if (arr.length <= 1) return arr; const mid = Math.floor(arr.length / 2); const left = mergeSort(arr.slice(0, mid)); const right = mergeSort(arr.slice(mid)); return merge(left, right); } function merge(left, right) { let result = [], i = 0, j = 0; while (i < left.length && j < right.length) result.push(left[i] < right[j] ? left[i++] : right[j++]); return result.concat(left.slice(i)).concat(right.slice(j)); }",
    
    "function dijkstra(graph, start) { const distances = {}; const visited = new Set(); const pq = new PriorityQueue(); distances[start] = 0; pq.enqueue(start, 0); while (!pq.isEmpty()) { const current = pq.dequeue(); if (visited.has(current)) continue; visited.add(current); for (const neighbor in graph[current]) { const distance = distances[current] + graph[current][neighbor]; if (!distances[neighbor] || distance < distances[neighbor]) { distances[neighbor] = distance; pq.enqueue(neighbor, distance); } } } return distances; }",
    
    "class Singleton { constructor() { if (Singleton.instance) { return Singleton.instance; } Singleton.instance = this; this.data = []; } getInstance() { return this; } addData(item) { this.data.push(item); } getData() { return this.data; } } const instance1 = new Singleton(); const instance2 = new Singleton(); console.log(instance1 === instance2);",
    
    "class ProductFactory { createProduct(type) { switch(type) { case 'A': return new ProductA(); case 'B': return new ProductB(); case 'C': return new ProductC(); default: throw new Error('Invalid product type'); } } } class ProductA { getName() { return 'Product A'; } } class ProductB { getName() { return 'Product B'; } }",
    
    "class Subject { constructor() { this.observers = []; } attach(observer) { this.observers.push(observer); } detach(observer) { this.observers = this.observers.filter(obs => obs !== observer); } notify(data) { this.observers.forEach(observer => observer.update(data)); } } class Observer { update(data) { console.log('Received:', data); } }",
    
    "type User { id: ID!; name: String!; email: String!; posts: [Post!]!; } type Post { id: ID!; title: String!; content: String!; author: User!; } type Query { user(id: ID!): User; users: [User!]!; post(id: ID!): Post; } type Mutation { createUser(name: String!, email: String!): User!; createPost(title: String!, content: String!, authorId: ID!): Post!; }",
    
    "db.users.find({ age: { $gte: 18 } }).sort({ name: 1 }).limit(10); db.users.aggregate([{ $match: { status: 'active' } }, { $group: { _id: '$city', count: { $sum: 1 } } }, { $sort: { count: -1 } }]); db.users.updateOne({ _id: ObjectId('...') }, { $set: { email: 'new@example.com' } });",
    
    "FROM node:16-alpine; WORKDIR /app; COPY package*.json ./; RUN npm install; COPY . .; EXPOSE 3000; ENV NODE_ENV=production; USER node; CMD ['npm', 'start']; HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:3000/health || exit 1;",
    
    "apiVersion: apps/v1; kind: Deployment; metadata: name: web-app; spec: replicas: 3; selector: matchLabels: app: web; template: metadata: labels: app: web; spec: containers: - name: web; image: nginx:1.19; ports: - containerPort: 80; resources: limits: memory: '128Mi'; cpu: '500m';",
  ],

  words: [
    "apple mountain keyboard thunder galaxy chocolate umbrella volcano penguin laptop whisper dragon bicycle tornado elephant guitar sunset horizon meadow rocket harvest crystal dolphin compass firework lightning anchor symphony butterfly carousel rainbow blanket telescope castle diamond echo freedom jungle keyboard",
    
    "cloud forest ocean piano river smile table window zebra anchor basket camera doctor engine flower garden helmet island jacket kettle ladder mirror notebook orange pencil queen radio science turbo uncle violin water yellow zipper beach coffee dream energy flame guitar",
    
    "adventure beauty courage destiny energy fortune glory harmony inspire journey kindness loyalty magic noble optimism peace quantum radiant stellar triumph unity victory wisdom xenon youth zenith amplify balance clarity dynamic elegant fantastic gorgeous happy incredible joyful",
    
    "algorithm binary cipher database encrypt function gateway hardware input java kernel lambda memory network object protocol quantum router server terminal update variable website xcode yaml zenith array buffer cache debug element framework gateway",
    
    "anchor beach canyon desert earth flame glacier horizon iceberg jungle kingdom lagoon mountain nebula oasis paradise quest river stream thunder universe valley wilderness xanadu yacht zenith aurora blossom cliff delta eclipse fjord",
    
    "action balance courage dream energy focus growth hope insight journey knowledge leader mission navigate opportunity patience quality resilience strength truth understanding victory wisdom excellence youth zenith ambition clarity determination effort fortune",
    
    "basketball cricket football hockey soccer tennis volleyball badminton golf rugby swimming archery boxing cycling fencing judo karate rowing sailing skiing surfing wrestling climbing diving hiking jogging kayaking martial parkour racing",
    
    "piano guitar violin drums flute saxophone trumpet trombone clarinet oboe harp banjo ukulele cello bass accordion harmonica keyboard synthesizer marimba xylophone tambourine cymbals gong triangle castanets mandolin lute sitar tabla djembe",
    
    "red blue green yellow orange purple pink brown black white gray silver gold bronze beige cream ivory tan khaki turquoise cyan magenta violet indigo maroon navy teal olive lime aqua coral salmon crimson scarlet ruby emerald",
    
    "sprint jump climb swim dive run walk jog skip hop bounce slide glide float soar fly dash race leap vault crawl march stride trot gallop rush hurry chase pursue sprint twist turn flip spin roll tumble",
    
    "alpha beta gamma delta epsilon zeta eta theta iota kappa lambda sigma omega prime vector matrix tensor scalar quantum flux energy photon neutron proton electron atom molecule particle wave spectrum orbit gravity",
    
    "thunder lightning storm rain snow wind cloud sun moon star planet comet meteor galaxy universe cosmos nebula supernova blackhole quasar pulsar asteroid orbit gravity eclipse aurora radiation spectrum photon neutron proton electron atom",
    
    "create build design develop construct produce generate manufacture assemble compose formulate devise invent innovate engineer architect draft sketch outline plan strategize organize coordinate execute implement deploy launch initiate activate commence establish",
    
    "quantum physics biology chemistry mathematics astronomy geology ecology botany zoology genetics evolution molecule atom electron proton neutron particle wave energy matter space time dimension gravity relativity entropy thermodynamics kinetic potential",
    
    "keyboard mouse monitor screen display laptop desktop tablet smartphone processor memory storage network internet browser software hardware database server client application program code script function variable constant array object class method",
    
    "adventure journey voyage expedition quest mission safari trek odyssey cruise travel explore discover navigate chart map compass direction north south east west latitude longitude altitude coordinate position location destination route path trail",
    
    "victory triumph success achievement accomplishment milestone breakthrough discovery innovation revolution transformation evolution progress advancement development growth expansion improvement enhancement optimization refinement perfection excellence mastery expertise proficiency skill talent ability competence",
    
    "mountain valley river lake ocean sea stream creek pond waterfall cascade rapids current tide wave ripple splash flow drain basin delta estuary gulf bay harbor coast shore beach sand pebble rock cliff canyon gorge",
    
    "morning afternoon evening night dawn dusk twilight sunrise sunset daybreak nightfall midnight noon breakfast lunch dinner yesterday today tomorrow week month year decade century millennium season spring summer autumn winter solstice equinox",
    
    "circle square triangle rectangle pentagon hexagon heptagon octagon nonagon decagon polygon ellipse oval sphere cube pyramid cone cylinder prism torus helix spiral curve arc angle vertex edge face surface area volume perimeter diameter radius",
    
    "velocity acceleration momentum force energy power torque pressure friction gravity mass weight density volume temperature heat entropy radiation frequency wavelength amplitude phase resonance oscillation vibration rotation revolution orbit trajectory path motion speed",
    
    "democracy republic monarchy oligarchy aristocracy theocracy autocracy dictatorship anarchy socialism capitalism communism feudalism imperialism colonialism nationalism globalism federalism confederacy parliament congress senate assembly legislature judiciary executive branch cabinet ministry",
    
    "philosophy logic ethics aesthetics metaphysics epistemology ontology phenomenology existentialism rationalism empiricism idealism realism pragmatism skepticism nihilism stoicism epicureanism humanism materialism dualism monism pluralism relativism absolutism determinism libertarianism utilitarianism",
    
    "poetry prose fiction drama comedy tragedy satire parody irony metaphor simile allegory symbolism imagery rhythm meter rhyme verse stanza sonnet haiku limerick ballad epic elegy ode hymn anthem narrative plot character theme setting conflict resolution",
    
    "telescope microscope spectroscope oscilloscope stethoscope periscope kaleidoscope gyroscope barometer thermometer hygrometer altimeter speedometer odometer chronometer metronome pendulum compass sextant astrolabe quadrant sundial hourglass stopwatch timer clock watch",
    
    "agriculture irrigation cultivation harvest fertilizer pesticide herbicide fungicide germination pollination photosynthesis transpiration respiration metabolism ecosystem biodiversity habitat conservation sustainability organic climate soil crop yield produce grain wheat corn rice",
    
    "architecture design construction blueprint foundation structure framework skeleton facade exterior interior pillar column beam arch dome vault ceiling floor wall door window staircase elevator corridor hallway chamber room apartment building skyscraper tower mansion",
    
    "medicine surgery diagnosis treatment therapy prescription antibiotic vaccine immunization inflammation infection disease syndrome disorder condition symptom diagnosis prognosis patient doctor nurse physician surgeon specialist clinic hospital emergency ambulance",
    
    "economy finance trade commerce business industry market supply demand profit revenue expense budget investment capital asset liability equity stock bond currency exchange inflation deflation recession depression growth development prosperity",
    
    "psychology behavior cognition emotion perception memory learning intelligence personality consciousness motivation sensation attention awareness thought reasoning judgment decision belief attitude value norm culture society individual group community",
    
    "astronomy telescope constellation galaxy nebula supernova planet satellite comet asteroid meteor orbit rotation revolution eclipse solar lunar celestial sphere horizon equator meridian zenith nadir azimuth altitude declination parallax parsec",
    
    "mythology legend folklore fable tale myth epic saga chronicle narrative story plot character hero villain protagonist antagonist conflict climax resolution theme moral lesson symbol archetype motif tradition ritual ceremony custom",
    
    "geometry algebra calculus trigonometry statistics probability topology analysis number theory logic set theory graph theory differential equation integral matrix vector tensor polynomial derivative integral limit function variable constant parameter",
    
    "chemistry element compound molecule atom ion bond reaction catalyst enzyme oxidation reduction synthesis decomposition equilibrium solution solvent solute concentration dilution titration precipitation crystallization distillation sublimation evaporation condensation",
    
    "history civilization empire dynasty kingdom republic revolution war peace treaty alliance conflict battle conquest colonization independence democracy monarchy feudalism renaissance reformation enlightenment revolution industrial modern contemporary ancient medieval",
    
    "literature novel story poem drama essay article review critique analysis interpretation theme character plot setting conflict resolution narrator perspective voice tone mood atmosphere symbolism imagery metaphor allusion irony foreshadowing flashback",
    
    "technology innovation invention discovery breakthrough advancement progress development evolution transformation revolution automation digitization computerization robotics artificial intelligence machine learning neural network algorithm data science analytics cloud computing blockchain cryptocurrency",
    
    "communication language speech writing reading listening speaking grammar syntax semantics phonetics morphology vocabulary pronunciation dialect accent fluency literacy comprehension expression interpretation translation conversation dialogue discourse rhetoric persuasion",
    
    "transportation vehicle automobile train airplane ship bicycle motorcycle bus truck van subway metro railway highway freeway road street avenue boulevard lane bridge tunnel station terminal airport harbor dock port garage parking",
    
    "education school college university academy institute learning teaching instruction training curriculum syllabus course lesson lecture seminar workshop tutorial examination assessment evaluation grade diploma degree certificate scholarship fellowship grant tuition",
    
    "environment ecology nature conservation preservation protection sustainability biodiversity habitat ecosystem climate weather pollution contamination deforestation urbanization endangered species renewable resource recycling waste management carbon footprint greenhouse emission",
    
    "religion faith belief worship prayer ritual ceremony sacrament temple church mosque synagogue cathedral monastery shrine pilgrimage scripture doctrine theology philosophy ethics morality virtue sin redemption salvation enlightenment spirituality meditation",
    
    "sports game match competition tournament championship league season athlete player team coach referee stadium arena field court track pool gym training exercise practice strategy tactic skill technique performance record medal trophy",
    
    "music melody harmony rhythm tempo beat measure note chord scale key signature composition arrangement orchestra symphony concerto sonata opera ballet dance performance concert recital rehearsal practice instrument vocal percussion",
    
    "art painting sculpture drawing sketch portrait landscape abstract impressionism expressionism surrealism realism cubism modernism contemporary classical renaissance baroque rococo romantic gothic medieval ancient primitive folk exhibition gallery museum",
    
    "food cuisine recipe ingredient spice herb seasoning flavor taste texture aroma appetizer entree dessert beverage breakfast lunch dinner snack meal dish plate bowl utensil knife fork spoon cooking baking roasting grilling",
    
    "fashion style clothing garment fabric textile design pattern color texture trend season collection runway model designer boutique retail store brand luxury casual formal elegant sophisticated classic modern vintage contemporary",
    
    "emotion happiness sadness anger fear surprise disgust joy excitement anxiety stress depression loneliness love hate jealousy pride shame guilt empathy sympathy compassion kindness patience courage confidence humility gratitude hope",
    
    "animal mammal reptile amphibian bird fish insect species habitat ecosystem predator prey carnivore herbivore omnivore vertebrate invertebrate domestic wild endangered extinct evolution adaptation migration hibernation camouflage",
    
    "weather climate temperature precipitation humidity wind pressure front storm hurricane tornado cyclone typhoon monsoon drought flood rain snow sleet hail fog mist cloud sunshine forecast meteorology atmosphere barometer",
    
    "plant flower tree bush shrub grass weed herb vine moss fern algae seed root stem leaf petal bloom blossom fruit vegetable crop garden forest jungle ecosystem photosynthesis chlorophyll pollination germination",
    
    "thought mind brain consciousness awareness perception cognition intellect reason logic wisdom knowledge understanding insight imagination creativity innovation inspiration motivation determination perseverance resilience adaptability flexibility",
  ],

  facts: [
    "The speed of light is approximately 299,792 kilometers per second. Light from the Sun takes about 8 minutes and 20 seconds to reach Earth. A light-year is the distance light travels in one year, roughly 9.46 trillion kilometers. The nearest star to our solar system, Proxima Centauri, is about 4.24 light-years away.",
    
    "The human brain contains approximately 86 billion neurons. Each neuron can form thousands of connections with other neurons, creating trillions of synapses. The brain uses about 20 percent of the body's total energy despite being only 2 percent of body weight. Information travels through neurons at speeds up to 268 miles per hour.",
    
    "DNA carries the genetic instructions for all living organisms. A single human cell contains about 6 feet of DNA when uncoiled. If all the DNA in a human body were placed end to end, it would stretch from the Sun to Pluto and back. DNA is composed of four nucleotide bases: adenine, thymine, guanine, and cytosine.",
    
    "The Roman Empire lasted for approximately 1,000 years from 27 BCE to 476 CE in the West. At its peak, the empire controlled territories spanning three continents: Europe, Asia, and Africa. The Romans built over 250,000 miles of roads throughout their empire. Latin, the language of ancient Rome, forms the basis for Romance languages.",
    
    "The Great Wall of China stretches over 13,000 miles including all its branches. Construction began in the 7th century BCE and continued for over 2,000 years. Contrary to popular belief, the Great Wall is not visible from space with the naked eye. The wall was built to protect Chinese states from invasions by nomadic groups.",
    
    "Water covers approximately 71 percent of Earth's surface. About 96.5 percent of all water on Earth is in the oceans as saltwater. Only 2.5 percent is freshwater, and most of that is frozen in ice caps and glaciers. Water is the only natural substance found in all three states at temperatures normally found on Earth.",
    
    "The human heart beats approximately 100,000 times per day, pumping about 2,000 gallons of blood. Over a lifetime of 70 years, the heart beats more than 2.5 billion times. The heart begins beating at just four weeks after conception. Blood travels through about 60,000 miles of blood vessels in the adult body.",
    
    "Mount Everest is the tallest mountain on Earth at 29,032 feet above sea level. The mountain grows about 4 millimeters each year due to tectonic plate movement. The first confirmed successful summit was achieved by Edmund Hillary and Tenzing Norgay in 1953. More than 300 people have died attempting to climb Everest.",
    
    "The Internet was developed in the late 1960s as a military project called ARPANET. The World Wide Web was invented by Tim Berners-Lee in 1989. The first email was sent in 1971 by Ray Tomlinson. As of 2024, over 5 billion people use the Internet globally. Google processes over 8.5 billion searches per day.",
    
    "Photosynthesis is the process by which plants convert sunlight into chemical energy. Plants absorb carbon dioxide from the air and release oxygen as a byproduct. A single large tree can produce enough oxygen for two people per year. The Amazon rainforest produces about 20 percent of Earth's oxygen.",
    
    "The Declaration of Independence was adopted on July 4, 1776, declaring the thirteen American colonies independent from Great Britain. Thomas Jefferson was the primary author of the document. The original document is housed in the National Archives in Washington. The famous phrase 'Life, Liberty and the pursuit of Happiness' comes from this document.",
    
    "Sound travels at approximately 767 miles per hour in air at sea level. Sound travels faster through liquids and solids than through air. Sound cannot travel through a vacuum because it requires a medium to propagate. The human ear can detect sounds ranging from 20 Hz to 20,000 Hz.",
    
    "The Industrial Revolution began in Britain in the late 18th century, transforming society from agrarian to industrial. Key innovations included the steam engine, spinning jenny, and power loom. The revolution led to mass production, urbanization, and significant social changes. Working conditions in early factories were often harsh with long hours.",
    
    "Black holes are regions of spacetime where gravity is so strong that nothing, not even light, can escape. They form when massive stars collapse at the end of their life cycles. The boundary of a black hole is called the event horizon. Supermassive black holes exist at the centers of most galaxies, including our Milky Way.",
    
    "Ancient Egypt's civilization lasted for over 3,000 years along the Nile River. The Great Pyramid of Giza, built around 2560 BCE, is one of the Seven Wonders of the Ancient World. Egyptians developed one of the first writing systems called hieroglyphics. They made significant advances in mathematics, medicine, and engineering.",
    
    "Gravity is the force that attracts objects with mass toward each other. Isaac Newton described gravity in his law of universal gravitation in 1687. Albert Einstein later provided a more complete description with his theory of general relativity. Gravity keeps planets in orbit around the Sun and holds galaxies together.",
    
    "The atom is the basic unit of matter consisting of protons, neutrons, and electrons. The nucleus contains protons and neutrons, while electrons orbit around it. Atoms are mostly empty space. If an atom were the size of a stadium, the nucleus would be the size of a marble at the center.",
    
    "The French Revolution began in 1789 and lasted until 1799, fundamentally changing France and influencing the world. It led to the end of absolute monarchy and the rise of democratic ideals. The storming of the Bastille on July 14, 1789, is celebrated as Bastille Day in France. The revolution introduced concepts of liberty, equality, and fraternity.",
    
    "Earthquakes are caused by the sudden release of energy in the Earth's crust, creating seismic waves. The point where an earthquake originates is called the focus or hypocenter. The point on the surface directly above the focus is the epicenter. The magnitude of earthquakes is measured using the Richter scale or moment magnitude scale.",
    
    "The Moon is Earth's only natural satellite, formed about 4.5 billion years ago. The same side of the Moon always faces Earth due to tidal locking. The Moon's gravitational pull causes ocean tides on Earth. Neil Armstrong became the first human to walk on the Moon on July 20, 1969, during the Apollo 11 mission.",
    
    "Vaccines work by training the immune system to recognize and fight specific pathogens. Edward Jenner developed the first vaccine against smallpox in 1796. Vaccines have prevented millions of deaths worldwide. The development of vaccines requires years of research and clinical trials to ensure safety and effectiveness.",
    
    "The Renaissance was a period of cultural rebirth in Europe from the 14th to 17th century. It began in Italy and spread throughout Europe, marking the transition from medieval to modern times. Great artists like Leonardo da Vinci, Michelangelo, and Raphael created masterpieces. The Renaissance also saw advances in science, literature, and philosophy.",
    
    "Cells are the basic building blocks of all living organisms. The human body contains approximately 37 trillion cells. Cells were first discovered by Robert Hooke in 1665 using a microscope. There are two main types of cells: prokaryotic cells without a nucleus and eukaryotic cells with a nucleus.",
    
    "World War II lasted from 1939 to 1945 and involved most of the world's nations. It was the deadliest conflict in human history, with an estimated 70 to 85 million fatalities. The war ended with the defeat of Nazi Germany and Imperial Japan. The United Nations was established in 1945 to prevent future global conflicts.",
    
    "The greenhouse effect is the warming of Earth's surface due to atmospheric gases trapping heat. Carbon dioxide, methane, and water vapor are the main greenhouse gases. Human activities, particularly burning fossil fuels, have increased greenhouse gas concentrations. This has led to global warming and climate change affecting weather patterns worldwide.",
    
    "Electricity is the flow of electric charge through a conductor. Benjamin Franklin's famous kite experiment in 1752 demonstrated that lightning is electrical. Thomas Edison developed the first practical electric light bulb in 1879. Electricity powers modern civilization, from lights and appliances to computers and electric vehicles.",
    
    "The Silk Road was an ancient network of trade routes connecting East and West for over 1,500 years. It facilitated trade in silk, spices, precious metals, and ideas between China and the Mediterranean. The Silk Road also enabled cultural exchange, spreading religions like Buddhism and Islam. Marco Polo traveled the Silk Road in the 13th century.",
    
    "Antibiotics are medicines that fight bacterial infections by killing bacteria or preventing their growth. Alexander Fleming discovered penicillin, the first antibiotic, in 1928. Antibiotics have saved millions of lives but must be used responsibly to prevent antibiotic resistance. Overuse and misuse of antibiotics can make bacteria resistant to treatment.",
    
    "The water cycle describes the continuous movement of water on, above, and below Earth's surface. Evaporation, condensation, precipitation, and runoff are the main processes. The Sun provides energy that drives the water cycle. About 96 percent of evaporation occurs from oceans. The water cycle is essential for distributing fresh water around the planet.",
    
    "The printing press, invented by Johannes Gutenberg around 1440, revolutionized communication and knowledge dissemination. It made books more affordable and accessible to the general population. The printing press played a crucial role in the Renaissance, Reformation, and Scientific Revolution. It democratized knowledge and accelerated the spread of ideas.",
    
    "Evolution is the process by which species change over time through natural selection. Charles Darwin proposed the theory of evolution in his 1859 book 'On the Origin of Species'. Fossils provide evidence of how organisms have changed over millions of years. DNA analysis has confirmed evolutionary relationships between species.",
    
    "The magnetic field of Earth is generated by the movement of molten iron in the planet's outer core. Earth's magnetic field protects us from harmful solar radiation and cosmic rays. The magnetic North Pole is not the same as the geographic North Pole. Compasses align with Earth's magnetic field to point toward magnetic north.",
    
    "The human eye can distinguish approximately 10 million different colors. Light enters through the cornea and pupil, then is focused by the lens onto the retina. The retina contains photoreceptor cells called rods and cones that detect light and color. The brain processes signals from the eyes to create the images we see.",
    
    "The American Civil War lasted from 1861 to 1865 between the Union and Confederate states. The war was primarily fought over the issue of slavery and states' rights. President Abraham Lincoln issued the Emancipation Proclamation in 1863, declaring slaves in Confederate states to be free. The war resulted in over 600,000 deaths.",
    
    "Plate tectonics is the theory that Earth's outer shell is divided into several plates that glide over the mantle. The movement of these plates causes earthquakes, volcanic activity, and the formation of mountain ranges. Continental drift, proposed by Alfred Wegener in 1912, laid the foundation for plate tectonic theory. Plates move at rates of centimeters per year.",
    
    "The Amazon rainforest is the largest tropical rainforest in the world, covering about 5.5 million square kilometers. It spans nine countries in South America, with the majority in Brazil. The Amazon produces about 20 percent of Earth's oxygen and contains about 10 percent of all species on the planet. Deforestation threatens this vital ecosystem.",
    
    "Antibodies are proteins produced by the immune system to identify and neutralize foreign objects like bacteria and viruses. Each antibody is specific to a particular antigen. B cells produce antibodies when they encounter pathogens. Antibodies provide immunity against diseases by remembering previous infections.",
    
    "The Cold War was a period of geopolitical tension between the United States and Soviet Union from 1947 to 1991. It was characterized by political, economic, and military rivalry without direct warfare between the superpowers. The Space Race and Arms Race were significant aspects of the Cold War. The fall of the Berlin Wall in 1989 symbolized the end.",
    
    "Photons are elementary particles that carry electromagnetic radiation, including visible light. Albert Einstein explained the photoelectric effect using photons in 1905, for which he won the Nobel Prize. Photons have no mass but carry energy and momentum. They travel at the speed of light in a vacuum.",
    
    "The Renaissance produced some of history's greatest artists and thinkers. Leonardo da Vinci created masterpieces like the Mona Lisa and The Last Supper. Michelangelo painted the Sistine Chapel ceiling and sculpted David. The period saw a revival of interest in classical Greek and Roman culture and humanism.",
    
    "Mitosis is the process of cell division that produces two identical daughter cells from a single parent cell. It consists of prophase, metaphase, anaphase, and telophase. Mitosis is essential for growth, repair, and asexual reproduction in organisms. Cancer occurs when cells divide uncontrollably through abnormal mitosis.",
    
    "The Vikings were Norse seafarers who raided, traded, and settled across Europe from the late 8th to 11th century. They originated from Scandinavia and reached as far as North America, which they called Vinland. Vikings were skilled shipbuilders and navigators. Their legacy includes significant cultural and genetic influence across Europe.",
    
    "Metabolism is the set of chemical reactions that occur in living organisms to maintain life. Catabolism breaks down molecules to produce energy, while anabolism uses energy to build molecules. Basal metabolic rate is the energy required to keep the body functioning at rest. Metabolism varies based on age, gender, genetics, and activity level.",
    
    "The Hubble Space Telescope was launched in 1990 and has provided stunning images and crucial data about the universe. It orbits Earth at about 547 kilometers above the surface. Hubble has helped determine the age of the universe at approximately 13.8 billion years. It continues to make important astronomical discoveries.",
    
    "The Mongol Empire was the largest contiguous land empire in history, established by Genghis Khan in the 13th century. At its peak, it stretched from Eastern Europe to the Sea of Japan. The Mongols facilitated trade and cultural exchange along the Silk Road. Their military tactics and organizational skills were revolutionary for the time.",
    
    "Quantum mechanics is the branch of physics that describes the behavior of matter and energy at atomic and subatomic scales. It introduced concepts like wave-particle duality and the uncertainty principle. Max Planck initiated quantum theory in 1900. Quantum mechanics has led to technologies like lasers, transistors, and quantum computers.",
    
    "The Age of Exploration from the 15th to 17th century saw European explorers discover new lands and sea routes. Christopher Columbus reached the Americas in 1492. Vasco da Gama found a sea route to India. Ferdinand Magellan's expedition completed the first circumnavigation of Earth. These voyages changed world history through colonization and trade.",
    
    "Osmosis is the movement of water molecules through a semipermeable membrane from an area of low solute concentration to high solute concentration. It is crucial for cell function and maintaining water balance in organisms. Osmosis explains how plants absorb water from soil. It is also used in water purification through reverse osmosis.",
    
    "The Manhattan Project was a research and development program during World War II that produced the first nuclear weapons. Led by the United States with support from the United Kingdom and Canada, it was directed by physicist J. Robert Oppenheimer. The first atomic bomb was tested in July 1945 in New Mexico. Atomic bombs were subsequently used on Hiroshima and Nagasaki.",
  ],
};

module.exports = typingTexts;