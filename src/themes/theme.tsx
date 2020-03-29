import {
    createMuiTheme
} from "@material-ui/core";

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#33abb8',
            main: '#0097a7',
            dark: '#006974',
            contrastText: '#fff'
        },
        secondary: {
            light: '#cfd8dc',
            main: '#fafafa',
            dark: '#90a4ae',
            contrastText: '#000'
        }
    },
    typography: {
        fontFamily: [
            'Roboto',
            'sans-serif',
        ].join(',')
    }
});
