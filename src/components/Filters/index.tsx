import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Stack,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

interface FiltersProps {}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const roles = [
  { label: "Backend", value: "backend" },
  { label: "Frontend", value: "frontend" },
  { label: "Fullstack", value: "fullstack" },
  { label: "iOS", value: "ios" },
  { label: "Flutter", value: "flutter" },
  { label: "Android", value: "android" },
  { label: "React Native", value: "react native" },
  { label: "Dev-Ops", value: "dev-ops" },
  { label: "Tech Lead", value: "tech lead" },
  { label: "Data Engineer", value: "data engineer" },
  { label: "Data Science", value: "data science" },
  { label: "Computer Vision", value: "computer-vision" },
  { label: "NLP", value: "nlp" },
  { label: "Web3", value: "web3" },
  { label: "SRE", value: "sre" },
  { label: "Deep Learning", value: "deep learning" },
];

const locations = [
  { label: "Remote", value: "remote" },
  { label: "Hybrid", value: "hybrid" },
  { label: "Bangalore", value: "bangalore" },
  { label: "Delhi NCR", value: "delhi ncr" },
  { label: "Chennai", value: "chennai" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Mumbai", value: "mumbai" },
];

const experienceMarks = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
];
const payMarks = [
  { value: 1, label: "1L" },
  { value: 10, label: "10L" },
  { value: 20, label: "20L" },
  { value: 30, label: "30L" },
  { value: 40, label: "40L" },
  { value: 50, label: "50L" },
  { value: 60, label: "60L" },
  { value: 70, label: "70L" },
];

const Filters: React.FC<FiltersProps> = () => {
  const theme = useTheme();
  return (
    <Stack style={{ padding: "20px 10px" }} spacing={2}>
      <TextField label="Search" variant="outlined" />
      <Typography>Filters</Typography>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Role</InputLabel>
        <Select
          labelId="demo-multiple-role-label"
          id="demo-multiple-role"
          multiple
          value={[]}
          // onChange={handleChange}
          input={<OutlinedInput id="select-multiple-roles" label="Role" />}
          renderValue={(selected: string[]) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}>
          {roles.map(({ label, value }) => (
            <MenuItem
              key={label}
              value={value}
              style={getStyles(value, [], theme)}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Location</InputLabel>
        <Select
          labelId="demo-multiple-location-label"
          id="demo-multiple-location"
          multiple
          value={[]}
          // onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-location" label="Location" />
          }
          renderValue={(selected: string[]) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}>
          {locations.map(({ label, value }) => (
            <MenuItem
              key={label}
              value={value}
              style={getStyles(value, [], theme)}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack>
        <Typography>Experience (years)</Typography>
        <div style={{ paddingRight: 15, paddingLeft: 5 }}>
          <Slider
            marks={experienceMarks}
            size="small"
            defaultValue={1}
            aria-label="Small"
            valueLabelDisplay="auto"
            min={0}
            max={10}
          />
        </div>
      </Stack>
      <Stack>
        <Typography>Minimum base pay</Typography>
        <div style={{ paddingRight: 15, paddingLeft: 5 }}>
          <Slider
            step={10}
            marks={payMarks}
            size="small"
            defaultValue={10}
            aria-label="Small"
            valueLabelDisplay="auto"
            min={1}
            max={70}
          />
        </div>
      </Stack>
    </Stack>
  );
};

export default Filters;
