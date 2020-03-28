This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn`

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## What is here

Introduces the new react hooks and potential use cases.
Introduces Typescript which will give us better tooling in IDE's and hopefully will give an overall clearer code base with less bugs :)

Has a bare bones redux setup if we decide to use it, along with the neat utility to clean up reducers called immer (https://codedaily.io/tutorials/58/Immutable-Data-with-Immer-and-React-setState

Redux Saga & Redux Observable examples were looked at for redux middleware to handle async actions (AKA API fetching tasks)
I am thinking If we use redux we could use either one of these middlewares for state we are managing in redux and potentially the custom hook mentioned below for any API calls we need to make that don't need to store the response in redux.

RxJs is introduced to complement state management duties along with providing a powerful way to fetch data.
For example, a service using RxJs was created to handle any kind of errors. It is basically a stream where any component can subscribe to data on the stream and react accordingly.

A Custom hook was created to abstract out API logic. I see us creating many custom hooks as we build baymax.
For example we could have a hook that verifys the user session is still active or verify roles 'useUserAuth' (react recommends pre-pendning hooks with 'use')

Material provides an AutoComplete component out of the box so this is experiemented here, results TBD

## Capacitor

> [Capacitor](https://capacitor.ionicframework.com/docs/) is a cross-platform app runtime that makes it easy to build web apps that run natively on iOS, Android, Electron, and the web. We call these apps "Native Progressive Web Apps" and they represent the next evolution beyond Hybrid apps.

### Install Dependencies

- https://capacitor.ionicframework.com/docs/getting-started/dependencies

### Run Locally

You must first start server before running Capacitor

- `yarn start`

### iOS

If this is your first time running the iOS Capacitor App

- `yarn init-deploy-ios`

After your first time running iOS Capacitor App

- `yarn deploy-ios`

### To launch the iOS app from Xcode

In the upper left of Xcode

1. Select your sevice and iOS version
2. Click the play button to launch the app (pointed at [http://localhost:3000](http://localhost:3000) by default)
