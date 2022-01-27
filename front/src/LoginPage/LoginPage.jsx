import Graph from "react-graph-vis";
import React, { Component } from "react";
import "./LoginPage.css";
import { AddCircle, Cancel, AddBox } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Stack,
  TextField
} from "@mui/material";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return <div className={"loginPage"}>

<Dialog disableEscapeKeyDown open={true} maxWidth="md">
        <DialogTitle>
          <div className="header">Mapium</div>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
          <TextField
                  fullWidth
                  placeholder="Логин или почта"
                  onChange={(e) =>
                    this.setState({ username: e.target.value })
                  }
                ></TextField>
                                <TextField
                  fullWidth
                  type="password"
                  placeholder="Пароль"
                  onChange={(e) =>
                  this.setState({ password: e.target.value })}
                ></TextField>

            <DialogActions>
              <Button
              >
                Регистрация
              </Button>
              <Button
               onClick={() => this.props.onCredentialsEnter(this.state.username, this.state.password)}
                variant="contained"
              >
                Войти
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>;
  }
}
