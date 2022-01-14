import React, { Component } from "react";
import "./Header.css";
import { AccountCircle, Logout, Map, AddBox, ArrowForwardIos } from "@mui/icons-material";
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
} from "@mui/material";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpened: false,
      selectedMapId: this.props.currentMapId,
    };
  }

  render() {
    return (
      <div className="headerBody">
        {this.state.isDialogOpened && this.renderDialog()}
        <Stack direction="row" spacing={2} className="headerLeftStack">
          <Button
            className="headerButton"
            variant="contained"
            startIcon={<Map />}
            onClick={() => {
              this.setState({ isDialogOpened: true });
            }}
          >
            <Typography sx={{ textTransform: "none" }}>
              Обзор
            </Typography>
          </Button>
          <Button
            className="headerButton"
            startIcon={<ArrowForwardIos />}
          >
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

  renderDialog() {
    return (
      <Dialog disableEscapeKeyDown open={true} maxWidth="sm" fullWidth>
        <DialogTitle>Выберите Карту</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
              <Select
                fullWidth
                value={this.state.selectedMapId}
                onChange={(e) => {
                  this.setState({ selectedMapId: e.target.value });
                }}
              >
                {this.getMenuItems(this.props.maps)}
              </Select>
            </Box>
            <Button startIcon={<AddBox />}>Создать карту</Button>
            <DialogActions>
              <Button
                onClick={() => {
                  this.setState({ isDialogOpened: false });
                }}
              >
                Отменить
              </Button>
              <Button
                onClick={() => {
                  this.setState({ isDialogOpened: false });
                  this.props.onMapPick(this.state.selectedMapId);
                }}
                variant="contained"
              >
                Открыть
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </Dialog>
    );
  }
}
