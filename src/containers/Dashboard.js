import React, { useState, useContext } from "react";
import { P, H1, Button, Input, Form, BodyWrapper } from "../components";
import { UserContext } from "../contexts/userContext";
import { ToastContext } from "../contexts/toastContext";
import firebase from "../firebase.js";
import "firebase/firestore";

const Dashboard = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [moreInfoComplete, setMoreInfoComplete] = useState(false);
  const { userState, userDispatch } = useContext(UserContext);
  const { sendMessage } = useContext(ToastContext);
  const db = firebase.firestore();

  const onClickSubmit = e => {
    e.preventDefault();
    if (firstName && lastName) {
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set(
          {
            firstName: firstName,
            lastName: lastName
          },
          { merge: true }
        )
        .then(() => {
          userDispatch({
            type: "additionalInfo",
            payload: {
              firstName: firstName,
              lastName: lastName
            }
          });
          setMoreInfoComplete(true);
          sendMessage("Welcome!");
        });
    } else {
      sendMessage("Please complete the form.");
    }
  };

  const moreInfo = () => {
    return (
      <BodyWrapper>
        <H1>MORE INFO</H1>
        <P>
          This is an introduction screen that shows up after the user
          successfully logs in for the first time. It's a good opportunity to
          collect additional information or provide them with important details
          about how your application works.
        </P>
        <Form>
          <div>
            <Input
              onChange={e => setFirstName(e.target.value)}
              name="firstName"
              placeholder="First name"
              autoComplete="given-name"
            />
          </div>
          <div>
            <Input
              onChange={e => setLastName(e.target.value)}
              name="lastName"
              placeholder="Last name"
              autoComplete="family-name"
            />
          </div>
          <Button onClick={e => onClickSubmit(e)}>SUBMIT</Button>
        </Form>
      </BodyWrapper>
    );
  };

  const dashboard = () => {
    return (
      <BodyWrapper>
        <H1>DASHBOARD</H1>
        <P>
          So this is your dashboard. Maybe you'll put a few graphs here, you've
          always wanted to try out D3. Maybe a news feed, or updates on new
          features.
        </P>
        <P>
          So this is your dashboard. Maybe you'll put a few graphs here, you've
          always wanted to try out D3. Maybe a news feed, or updates on new
          features. So this is your dashboard. Maybe you'll put a few graphs
          here, you've always wanted to try out D3. Maybe a news feed, or
          updates on new features. So this is your dashboard. Maybe you'll put a
          few graphs here, you've always wanted to try out D3. Maybe a news
          feed, or updates on new features.
        </P>
        <P>
          So this is your dashboard. Maybe you'll put a few graphs here, you've
          always wanted to try out D3. Maybe a news feed, or updates on new
          features.
        </P>
        <P>
          So this is your dashboard. Maybe you'll put a few graphs here, you've
          always wanted to try out D3. Maybe a news feed, or updates on new
          features. So this is your dashboard. Maybe you'll put a few graphs
          here, you've always wanted to try out D3. Maybe a news feed, or
          updates on new features.
        </P>
        <P>
          So this is your dashboard. Maybe you'll put a few graphs here, you've
          always wanted to try out D3. Maybe a news feed, or updates on new
          features.
        </P>
        <P>
          So this is your dashboard. Maybe you'll put a few graphs here, you've
          always wanted to try out D3. Maybe a news feed, or updates on new
          features. So this is your dashboard. Maybe you'll put a few graphs
          here, you've always wanted to try out D3. Maybe a news feed, or
          updates on new features.
        </P>
        <P>
          So this is your dashboard. Maybe you'll put a few graphs here, you've
          always wanted to try out D3. Maybe a news feed, or updates on new
          features.
        </P>
      </BodyWrapper>
    );
  };
  return moreInfoComplete || userState.userData.firstName
    ? dashboard()
    : moreInfo();
};

export default Dashboard;
