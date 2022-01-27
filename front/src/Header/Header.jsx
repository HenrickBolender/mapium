import React, { Component } from "react";
import "./Header.css";
import {
  AccountCircle,
  Logout,
  Map,
  AddBox,
  ArrowForwardIos,
} from "@mui/icons-material";
import {
  Button,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Select,
  DialogActions,
  MenuItem,
  TextField,
} from "@mui/material";
import { getMaps } from "../api";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapsDialogOpened: false,
      maps: [],
      selectedMapId: this.props.currentMapId,
      isCreateMapMode: false,
      newMapName: "",
    };
  }

  render() {
    return (
      <div className="headerBody">
        {this.state.isMapsDialogOpened && this.renderMapsDialog()}
        <Stack direction="row" spacing={2} className="headerLeftStack">
          <Button
            className="headerButton"
            variant="contained"
            startIcon={<Map />}
            onClick={() => {
              getMaps(this.props.userId).then((maps) => {
                this.setState({
                  isMapsDialogOpened: true,
                  maps,
                  selectedMapId: maps[0].id,
                });
              });
            }}
          >
            <Typography sx={{ textTransform: "none" }}>Обзор</Typography>
          </Button>
          <Button className="headerButton" startIcon={<ArrowForwardIos />}>
            <Typography sx={{ textTransform: "none" }}>
              {this.props.mapName}
            </Typography>
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} className="headerRightStack">
          <Button
            className="headerButton"
            variant="contained"
            startIcon={<AccountCircle />}
          >
            <Typography sx={{ textTransform: "none" }}>
              {this.props.userName}
            </Typography>
          </Button>
          <Button
            className="headerButton"
            variant="contained"
            onClick={this.props.logout}
            startIcon={<Logout />}
          >
            <Typography sx={{ textTransform: "none" }}>Выйти</Typography>
          </Button>
        </Stack>
      </div>
    );
  }

  getMenuItems(maps) {
    return maps.map((map) => (
      <MenuItem key={map.id} value={map.id}>
        {map.name}
      </MenuItem>
    ));
  }

  renderMapsDialog() {
    return (
      <Dialog disableEscapeKeyDown open={true} maxWidth="sm" fullWidth>
        <DialogTitle>
          {this.state.isCreateMapMode ? "Создание карты" : "Выберите Карту"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {this.state.isCreateMapMode ? (
              <div>
                <TextField
                  fullWidth
                  placeholder="Название карты"
                  value={this.state.newMapName}
                  onChange={(e) =>
                    this.setState({ newMapName: e.target.value })
                  }
                ></TextField>
              </div>
            ) : (
              <div>
                <Box
                  component="form"
                  sx={{ display: "flex", flexWrap: "wrap" }}
                >
                  <Select
                    fullWidth
                    value={this.state.selectedMapId}
                    onChange={(e) => {
                      this.setState({ selectedMapId: e.target.value });
                    }}
                  >
                    {this.getMenuItems(this.state.maps)}
                  </Select>
                </Box>
                <br/>
                <Button
                  fullWidth
                  startIcon={<AddBox />}
                  onClick={() => this.setState({ isCreateMapMode: true })}
                >
                  Создать карту
                </Button>
              </div>
            )}

            <DialogActions>
              <Button
                onClick={() => {
                  this.setState({ isMapsDialogOpened: false });
                }}
              >
                Отменить
              </Button>
              <Button
                onClick={() => {
                  this.setState({ isMapsDialogOpened: false });
                  if (this.state.isCreateMapMode) {
                    this.props.addMap(this.state.newMapName);
                  } else {
                    this.props.onMapPick(this.state.selectedMapId);

                  }
                }}
                variant="contained"
              >
                {this.state.isCreateMapMode ? "Создать" : "Открыть"}
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </Dialog>
    );
  }
}
