## PannDF
Annotation in PDF - improve OpenReview

# To setup
To run this repository, run the following command:
```
cd client
npm install
npm start
```

Your browser should be automatically opened and the app should run on http://localhost:3000/.
If there is any dependency issue, please install the missing dependency manually. The dependencies are:
```
"bootstrap": "^4.3.1",
    "pdfjs-dist": "^2.2.228",
    "react": "^16.11.0",
    "react-dom": "^16.11.0",
    "react-latex": "^1.5.0",
    "react-pointable": "^1.1.3",
    "react-rnd": "^10.1.3",
    "react-scripts": "^3.3.0",
    "reactstrap": "^8.1.1",
    "url-search-params": "^1.1.0"
```

# About this app
This app intends to improve the user experience of OpenReview. The default page shows an improvement of https://openreview.net/forum?id=r1zb29kus7. 

The main features are:
1. Improved display of comment threads
2. Forced review structure
3. Easier filtering
4. Inline comments on PDF with different tags having different colors

Unsupported features:
1. Making new comments
2. Author is default as only one Author. No authorization features

# Change PDF
Change the DEFAULT_URL at `client/src/components/Doc.js`.
