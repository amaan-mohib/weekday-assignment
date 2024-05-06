import {
  Avatar,
  Button,
  Card,
  CardContent,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { IListing } from "../../utils";
import "./styles.css";
import { locations, roles } from "../Filters";

interface ListingCardProps {
  listItem: IListing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listItem }) => {
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const [showViewMore, setShowViewMore] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  useEffect(() => {
    if (!descriptionRef.current) return;
    // calculate whether to show "View more" button on description based on overflow
    setShowViewMore(
      descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight
    );
  }, [descriptionRef.current]);

  return (
    <>
      <Modal
        open={showDescriptionModal}
        onClose={() => setShowDescriptionModal(false)}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "calc(100% - 2rem)",
            maxWidth: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}>
          <Typography variant="h5">Job details</Typography>
          <div style={{ marginTop: 10 }}>{listItem.jobDetailsFromCompany}</div>
        </Paper>
      </Modal>
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={1}>
            <Stack direction="row" spacing={2}>
              <Avatar src={listItem.logoUrl} alt={listItem.companyName} />
              <Stack alignItems="flex-start">
                <Typography color="text.secondary">
                  {listItem.companyName}
                </Typography>
                <Typography textTransform={"capitalize"}>
                  {roles.find((item) => item.value === listItem.jobRole)
                    ?.label || listItem.jobRole}
                </Typography>
                <Typography
                  textTransform={"capitalize"}
                  fontSize="14px"
                  fontWeight={500}>
                  {locations.find((item) => item.value === listItem.location)
                    ?.label || listItem.location}
                </Typography>
              </Stack>
            </Stack>
            <Typography>
              {listItem.minJdSalary || listItem.maxJdSalary
                ? `Estimated Salary: ${
                    listItem.salaryCurrencyCode === "USD"
                      ? "$"
                      : listItem.salaryCurrencyCode === "INR"
                      ? "₹"
                      : listItem.salaryCurrencyCode
                  }${listItem.minJdSalary || 0} - ${
                    listItem.maxJdSalary || listItem.minJdSalary || 0
                  } ${listItem.salaryCurrencyCode === "INR" ? "LPA" : "TPY"}`
                : ""}
            </Typography>
            <div style={{ position: "relative" }}>
              <div className="description-wrapper" ref={descriptionRef}>
                {listItem.jobDetailsFromCompany}
              </div>
              {showViewMore && (
                <div className="description-view-more">
                  <Button onClick={() => setShowDescriptionModal(true)}>
                    View more
                  </Button>
                </div>
              )}
            </div>
            {listItem.minExp && listItem.maxExp ? (
              <Stack>
                <Typography color="text.secondary">Experience</Typography>
                <Typography>
                  {listItem.minExp || 0} - {listItem.maxExp || 0} years
                </Typography>
              </Stack>
            ) : (
              <div style={{ height: 48 }}></div>
            )}
            <Button
              target="_blank"
              LinkComponent={"a"}
              href={listItem.jdLink}
              variant="contained"
              style={{
                backgroundColor: "#55EFC4",
                color: "#000",
                boxShadow: "none",
                marginTop: 20,
                fontSize: "18px",
              }}>
              Apply
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default ListingCard;
