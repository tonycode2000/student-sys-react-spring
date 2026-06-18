# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

[Spring_explain_____________________________________]
====================================================
វាជា Spring Boot REST API Project នេះគឺជា Spring Boot Web Application ដែលប្រើ pattern MVC (Model - Service - Repository - Controller) ។
--------------------------------------------------------------
**** រចនាសម្ព័ន្ធ Code ****

stusys/
├── model/
│   └── Student.java          ← តំណាងតារាង database
├── repository/
│   └── StudentRepository.java ← ទំនាក់ទំនងជាមួយ database
├── service/
│   ├── StudentService.java       ← Interface
│   └── StudentServiceImpl.java   ← Logic ពិតប្រាកដ
└── controller/
    └── StudentController.java    ← API endpoint (HTTP)
------------------------------------------------------------
**** ទំនាក់ទំនងរវាង Layer នីមួយៗ ****

Frontend (React)
      ↓  HTTP Request
Controller  ← ទទួល request ពី browser/frontend
      ↓
Service     ← ដំណើរការ business logic
      ↓
Repository  ← ទំនាក់ទំនងជាមួយ MySQL
      ↓
Database (MySQL)

[RUN___________________________________]
*** Just cmd npm run dev can run hold system
--- Create package.json in root

{
  "name": "student-sys",
  "version": "1.0.0",
  "scripts": {
    "frontend": "cd studentsysfrontend && npm run dev",
    "backend": "cd stusys && mvnw.cmd spring-boot:run",
    "dev": "concurrently \"npm run backend\" \"npm run frontend\""
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}

--- Run npm install in root 

[Git______________________________________________]
git init
git add .
git commit -m "First commit for Student System Spring MVC"
git branch -M main
git remote add origin https://github.com/tonycode2000/stu_sys_spring_mvc.git
git push -u origin main