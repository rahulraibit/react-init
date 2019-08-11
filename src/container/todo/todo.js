import React, { Component, Fragment } from "react";
import {
    withStyles,
    Grid,
    TextField,
    Icon,
    Fab
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import ACTIONS from "./todoAction";
import { connect } from "react-redux";
const styles = theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    }
});

class ToDO extends Component {
    state = { 'item': '' };

    handleSubmit = event => {
        // console.log(this.state.item);
        this.setState({ item: "" });
        if (this.state.item !== "") {
            // add the item to the store
            this.props.createItem(this.state.item);
        }
        event.preventDefault();
    };

    handleDelete = event => {
        // delete the item from the store
        this.props.deleteItem(event.target.value);
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <main>
                <center>
                    <form noValidate autoComplete="off" >
                        <Grid container>
                            <Grid item xs={11}>
                                <TextField
                                    label="New Task"
                                    fullWidth={true}
                                    id="margin-dense"
                                    value={this.state.item}
                                    className={classes.textField}
                                    name="item"
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Fab color="primary" aria-label="add" className={classes.fab}>
                                    <AddIcon onClick={this.handleSubmit} />
                                </Fab>
                            </Grid>
                        </Grid>
                    </form>
                    <br />
                    <h2 style={{ textAlign: "initial" }}>{"List Of Task"}</h2>
                    <Grid container justify="center" alignItems="center" spacing={3}>
                        {this.props.items.map((item, i) => (
                            <Fragment key={i}>
                                <Grid item xs={12} sm={10}>
                                    <div className="description">{item.description}</div>
                                </Grid>
                                <Grid item xs={12} sm={2} justify="flex-start">
                                    <Fab color="secondary" aria-label="edit" className={classes.fab}>
                                        <Icon>edit_icon</Icon>
                                    </Fab>
                                    <Fab aria-label="delete" onClick={this.handleDelete} className={classes.fab}>
                                        <DeleteIcon />
                                    </Fab>
                                </Grid>
                            </Fragment>
                        ))
                        }
                    </Grid>
                </center>
            </main>
        );
    }
}

const mapStateToProps = state => ({
    items: state.todoReducer.items
});

const mapDispatchToProps = dispatch => ({
    createItem: item => dispatch(ACTIONS.createItem(item)),
    deleteItem: id => dispatch(ACTIONS.deleteItem(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ToDO));
