import { Subject } from "rxjs";


// allow components to respond to any errors in the application if needed
const backSubject = new Subject();
const backObs = backSubject.asObservable();
const customBackHandler = new Subject()
const handleObs = customBackHandler.asObservable()

const showBack = (value: boolean) => {
    backSubject.next(value)
};

// let the calling container handle how to go back
const handle = () => {
    customBackHandler.next(true)
}

// only expose the reactive functions
export { backObs, showBack, handle, handleObs };
