# Practice Journal
Single-Page Application built with React.js and Ruby-on-Rails 
[Link to App](http://practicejournal.herokuapp.com/)
* Ruby version v 2.53

* Key yarn dependencies </br>
  "cloudinary-react": "^1.3.2", </br>
  "mic-recorder-to-mp3": "^2.2.1", </br>
  "prop-types": "^15.7.2", </br>
  "react": "^16.13.0", </br>
  "react-dom": "^16.13.0", </br>
  "react-icons": "^3.9.0", </br>
  "react-pdf": "^4.1.0" </br>
* Key gem dependencies </br>
  gem 'active_model_serializers', '~> 0.10.0'</br>
  gem 'cloudinary'</br>
## Why I made this app
Whenever I want to practice playing the violin, I find it troublesome that I have to find my practice journal, my music scores, and my audio recorder before I can start practicing. Thus, I thought of the idea to create a web-based application which have access to these 3 things at once.

## What my app does
This is an app which helps musicians practise purposefully and systematically. Everyday, users will be able to journal their goals and reflection. In each daily entry, they can also submit audio recordings of their playing so they can keep track of their playing and identify ways they can improve on it.

## Database Schema
Journal Entry</br>
Goals :string</br>
Reflections :string</br>
Date </br>
</br>
Recordings</br>
Journal_id </br>
File :string(URL)

## General Process
1. Coming up with the wireframe
2. Looking for middlewares that allow me to record audio and display music sheet.
3. Planning how I should stack my React Componenets
4. Linking the back-end
5. Aesthetics

## Major hurdles and how I overcame them
#### Finding an interface to record audio
When I had the idea to create this app, my initial concern was to find a way to record audio files. Fortunately I came across this module [mic-recorder-to-mp3](https://www.npmjs.com/package/mic-recorder-to-mp3), a package which can enable the client's built-in microphone to record audio files.

#### Finding a way to store audio files
Then, I needed to find a way to store and retrieve the audio files. The audio files has to be stored in the database if they were to be stored permanently(and not get wiped away from a refresh). As this is a SPA, I need to find a way to pass audio files with a XMLHttpRequest. The audio file is a Javascript File Object of a Binary Large Object DataType. One way to pass such data is to use the FormData Object, which is an object consisting of key-value pairs, specifically used to transfer data over a XMLHttpRequest. Once the audio files could be passed over, the audio files can be easily stored using the Cloudinary API - it will store the actual file in the cloud and provide a link with which you can access it. The link will be stored in the database.

#### Dealing with recordings of different file types when updating the journal entry
As I am using the same POST request to create and update a journal entry, when the user adds new recordings (on top of existing ones) , the data-type of the recordings will not be uniform in the POST request - existing recordings will be a URL link, whereas new recordings will be a Javascript File Object. To go around this, I came up with the solution of creating a conditional loop where it ignores the URL link and only insert new recordings into the journal entry.

#### Finding a way to retrieve journal entries and update state in React
After the POST request is made, I want to be returned a JSON object of the current journal entry. As a journal entry consists of a 1TM relationship between the journal and the recording, I had to find a way to get a JSON object of a joint-query. I came across this [guide](https://buttercms.com/blog/json-serialization-in-rails-a-complete-guide) which allows me to do just this. I followed the documentation for active_model_serializers and was able to create a JSON object of the joint query. Using this JSON object, I am then able to conveniently update the state of my Journal Component. I am thus able to update recordings, goals, and reflections without rerendering the whole application. 

#### Finding a way to upload and view PDF 
Next key hurdle was to develop the functionality of uploading and displaying the music sheet. I was looking at the Cloudinary documentation where I came across a [demo](https://cloudinary.com/blog/how_to_build_an_image_library_with_react_cloudinary) of building an image library using Cloudinary-React. Together with the react-pdf middleware I found, I tweaked the codes and successfully created the function.

## Summary and Takeaways
This is an unconventional project, which has taught me to deal with the different data types using React.js. It has also given me the confidence to pick up and apply new technologies within a short timeframe.


