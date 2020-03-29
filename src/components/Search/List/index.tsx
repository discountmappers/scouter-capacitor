import React, { useContext } from "react";
import { Grid, Card, makeStyles, Typography, CardContent } from "@material-ui/core";

type ListViewProps = {

};

const mockResults = [
    {

        "name": "Starbucks Deal",
        "dealDesc": "20% off Venti Americano",
        "notes": "Onle applicable in Union Square Stores",
        "lat": 89,
        "lng": 90,
        "address": '146 forest',
        "category": 'Coffee',
    },
    {

        "name": "Starbucks Deal",
        "dealDesc": "20% off Venti Americano",
        "notes": "Onle applicable in Union Square Stores",
        "lat": 89,
        "lng": 90,
        "address": '146 forest',
        "category": 'Coffee',
    },
    {

        "name": "Dunkin Deal",
        "dealDesc": "20% off Venti Americano",
        "notes": "Onle applicable in Union Square Stores",
        "lat": 89,
        "lng": 90,
        "address": '146 forest',
        "category": 'Coffee',
    },
    {

        "name": "John Laundromat",
        "dealDesc": "5% discount on weekends",
        "notes": "Onle applicable in Union Square Stores",
        "lat": 89,
        "lng": 90,
        "address": '146 forest',
        "category": 'Services',
    },
    {

        "name": "Dunkin Deal",
        "dealDesc": "20% off Venti Americano",
        "notes": "Onle applicable in Union Square Stores",
        "lat": 89,
        "lng": 90,
        "address": '146 forest',
        "category": 'Food',
    },
    {

        "name": "Applebees",
        "dealDesc": "20% off apps",
        "notes": "Onle applicable in Union Square Stores",
        "lat": 89,
        "lng": 90,
        "address": '146 forest',
        "category": 'Food',
    }
]
const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    img: {
        width: 60,
        height: 60,
        padding: '10px 10px 10px 10px'
    },

    playIcon: {
        height: 38,
        width: 38,
    },
});
const ListView = (props: ListViewProps) => {
    const classes = useStyles();
    // get results from context
    //const { position, searchByCustom, locationName } = useContext(SearchContainerContext)
    const getItemCards = () => {
        let more = [...mockResults, ...mockResults]
        const cards = more.map(result => {
            return (<><Grid item xs={10} md={7} lg={4}>
                <Card className={classes.root}>
                    <img className={classes.img} src="https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png" />

                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography variant="body2">
                                {result.dealDesc}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary">
                                {result.name}
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </Grid><Grid item xs={12}></Grid></>)

        })
        return cards
    }
    return (

        <Grid container justify="center" spacing={1} className="listViewContainer">
            {getItemCards()}
        </Grid>

    )
}

export default ListView



