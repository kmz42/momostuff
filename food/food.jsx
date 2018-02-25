class Foodapp extends React.Component {

    constructor(props) {
        super(props);
        
    }


    componentDidMount() {
        // Make the calls for info.json files
    }

    render() {
        return (
            <div>
                <Foodlinks />
                <Foodslideshow />
            </div>
        );
    }
}


ReactDOM.render(<Foodapp />, document.getElementById('root'));