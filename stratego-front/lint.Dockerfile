FROM node:20 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Run ESLint and store the result in a variable
# If there are errors or warnings, this will exit with a non-zero code
RUN npx eslint src --max-warnings=0

# Continue with the rest of your build process
# ...

CMD ["node"]