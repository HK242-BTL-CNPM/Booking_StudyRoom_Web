# React + TypeScript + Vite

## Giới thiệu

Dự án này sử dụng React, TypeScript và Vite để cung cấp một môi trường phát triển nhanh chóng và hiệu quả.

## Yêu cầu

Trước khi bắt đầu, hãy đảm bảo rằng bạn đã cài đặt các công cụ sau:

- [Node.js](https://nodejs.org/) (phiên bản 16 trở lên)
- [Yarn](https://yarnpkg.com/) hoặc [npm](https://www.npmjs.com/)

## Cài đặt

1. Clone repository về máy:
   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```
2. Cài đặt các dependencies:
   ```sh
   npm install
   # Hoặc dùng Yarn
   yarn install
   ```

## Chạy dự án

3. Chạy server ở chế độ development:
   ```sh
   npm run dev
   # Hoặc dùng Yarn
   yarn dev
   ```
   Mặc định, ứng dụng sẽ chạy trên `http://localhost:5173/`.

## Chạy Tailwind

4. Chạy server ở chế độ development:

   ```sh
   npm run tw
   # Hoặc dùng Yarn
   yarn tw
   ```

## Build dự án

5. Để build production:
   ```sh
   npm run build
   yarn build
   ```
   Output sẽ được tạo trong thư mục `dist/`.

## Chạy ứng dụng sau khi build

6. Để chạy ứng dụng đã build:
   ```sh
   npm run preview
   # Hoặc dùng Yarn
   yarn preview
   ```

````

## Cấu trúc dự án

```
<FE>/
├── src/                 # Mã nguồn chính của ứng dụng
│   ├── components/      # Các component React
│   ├── pages/           # Các trang của ứng dụng
│   ├── App.tsx          # Component gốc của ứng dụng
│   ├── main.tsx         # Điểm vào chính của ứng dụng
├── public/              # Tài nguyên tĩnh
├── .eslintrc.js         # Cấu hình ESLint
├── tsconfig.json        # Cấu hình TypeScript
├── vite.config.ts       # Cấu hình Vite
├── package.json         # Danh sách dependencies và scripts
└── README.md            # Hướng dẫn sử dụng
```

## Mở rộng cấu hình ESLint

Nếu bạn đang phát triển một ứng dụng sản xuất, hãy cập nhật cấu hình để bật các quy tắc lint nâng cao:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

## Liên hệ

Nếu bạn gặp vấn đề hoặc cần hỗ trợ, hãy mở issue trên GitHub hoặc liên hệ qua email.

Chúc bạn code vui vẻ! 🚀
End

## Lệnh chạy tailwind

npx tailwindcss -i ./src/assets/css/input.css -o ./src/assets/css/output.css --watch

## Các file tailwind liên quan

- input.css: chứa các component dùng chung cho dự án

- tailwind.config.js: chứa các mã màu, font chữ dùng chung
````
