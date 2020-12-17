import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
// import { Link } from 'react-router-dom'
import '../assets/css/App.css';
import Navibar from './Navbar.jsx'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Search from './SearchPage'
import PlayBox from './SearchBar'
import TextField from '@material-ui/core/TextField'
import PinIcon from './PinIcon'
import Button from 'react-bootstrap/Button';
import Pin from './Pin'
import Logo from './Logo'

import Scroll from "react-scroll"
var Link = Scroll.Link;
var DirectLink = Scroll.DirectLink;
var Element = Scroll.Element;
var Events = Scroll.Events;
var scroll = Scroll.animateScroll;
var scrollSpy = Scroll.scrollSpy;


class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioStamp: 0,
      audioTranscript: "",
      pins: [],
      pinTime: 0,
      accordion_title: "Supreme Court",
      accordion_body: "",
      pinOrder: 0,
    };

  }

  handlePin = (pin) => {
    this.setState({
      pinTime: pin,
    })
  }

  makePin = (pinTime) => {
    console.log("======MAKING PinTime========")
    console.log("=======Pinorder=====", this.state.pinOrder)
    //get timestamp from audio
    var timestamp = this.state.pinTime;
    console.log("timestamp", timestamp)
    //create pins object
    var pinId = Math.random() * 10000
    var newPin = {
      pinId: pinId,
      timeStamp: this.state.pinOrder == 0 ? "0:16" : "0:28",
      title: "The Daily: An Unfinished Election",
      tags: ["Joe Biden", "Donald Trump"],
      accordion_title: this.state.pinOrder == 0 ? "Supreme Court" : "Joe Biden",
      accordion_body: this.state.pinOrder == 0 ? `The Supreme Court of the United States (SCOTUS) is the highest court in the federal judiciary of the United States of America. It has ultimate (and largely discretionary) appellate jurisdiction over all federal and state court cases that involve a point of federal law, and original jurisdiction over a narrow range of cases, specifically "all Cases affecting Ambassadors, other public Ministers and Consuls, and those in which a State shall be Party".[2] The Court holds the power of judicial review, the ability to invalidate a statute for violating a provision of the Constitution.` :
      "Joseph Robinette Biden Jr.; born November 20, 1942) is an American politician and the president-elect of the United States. Having defeated incumbent Donald Trump in the 2020 United States presidential election, he will be inaugurated as the 46th president on January 20, 2021. A member of the Democratic Party, Biden served as the 47th vice president from 2009 to 2017 and a United States senator for Delaware from 1973 to 2009",
      accordion_img: this.state.pinOrder == 0 ? "/Supreme_court.svg.png" : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Joe_Biden_official_portrait_2013.jpg/220px-Joe_Biden_official_portrait_2013.jpg"
    }

    this.state.pins.push(newPin)

    this.setState({
      pinOrder: 1,
    })

    //send request to backend, update database with pin
  }



  componentDidMount = (e) => {
    const url = 'http://localhost:3000/db/getTranscript'
    fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res)=> res.json())
    .then((json) => {
      this.setState({
        audioTranscript: json
      })
    })
    .catch((err)=> {
      console.log('Error: ', err);
    });
  }
  render() {
    // const audioTranscript = this.state.audioTrascript.map((transcript, i) => (
    //   <div key="text">
    //     <p> {this.state.audioTrascript} </p>
    //   </div>
    // ))
    //pre-rendering code
    const pinArr = this.state.pins.map((pin, i) => (
      <div key={pin.pinId}>
      <Pin title={pin.title} timestamp={pin.timeStamp} tags={pin.tags} accordion_title={pin.accordion_title} accordion_body={pin.accordion_body} accordion_img={pin.accordion_img}/>
      </div>
    ));

    return (
      <Container fluid className="discussion_background main-back" style={{ height: "100%" /*backgroundColor: "#353B74"*/}}>
      <Row>
      <Col className="pl-0 pr-0" id="far_left" xs={2} style={{ justifyContent: "flex-start", display: "flex", alignItems: "center", flexDirection: "column", backgroundColor: "#5C719B" }}>
      <Row>
      <img style = {{width: 30, height: 30, paddingRight: 3, paddingBottom: 2, paddingTop: 3}} src="/LOGO.png" />
      <p style={{
        color: 'white',
        fontSize: 19,
        fontWeight: "bold",
        paddingTop: 5}}>
          PINCAST
      </p>
      </Row>
      <Row>
      <Search />
      </Row>
      <Container className = "mb-1" style={{}}>
      <Row className="ml-4">
      <p className = "EuclidFlexMedium" style={{ color: "white", fontSize: "16px"}}>Home</p>
      </Row>
      <Row className="ml-4">
      <p className = "EuclidFlexMedium" style={{ color: "white"}}>Search</p>
      </Row>
      <Row className="ml-4">
      <p className = "EuclidFlexMedium" style={{ color: "white"}}>Pins</p>
      </Row>
      <Row className="ml-4">
      <p className = "EuclidFlexMedium" style={{ color: "white"}}>Profile</p>
      </Row>
      <Row className="ml-4">
      <p className = "EuclidFlexMedium" style={{ color: "white"}}>Saved Podcasts</p>
      </Row>
      <Row className="ml-4">
      <p className = "EuclidFlexMedium" style={{ color: "white"}}>Followed</p>
      </Row>
      <Row className="ml-4">
      <p className = "EuclidFlexMedium" style={{ color: "white"}}>Discovered</p>
      </Row>
      <Row className="ml-4">
      <p className = "EuclidFlexMedium" style={{ color: "white"}}>New Releases</p>
      </Row>
      </Container>
      <PlayBox handlePin={this.handlePin} />

      </Col>
      <Col id="middle" xs={3} style={{
           height: "30", minHeight: "50%", height: "850px", overflow: "scroll",display: "flex", borderRadius: "30px 0px 0px 30px", backgroundColor: "#4F57AA", boxShadow: "12px 0 15px -4px rgba(0,0,0,0.5), -12px 0 8px -4px rgba(0,0,0,0.5)",
       }}>
      <div style={{ display: "flex", flexDirection: "column", overflow: "scroll"}
    } >
    <p className = "sidebarText" style={{ height: "55.5%", color: "white", fontSize: "20px", padding: "30px", paddingRight: "130px", overFlow: "scroll" }}>
    {this.state.audioTranscript}
    </p>
    <div class="hl" style = {{alignSelf: "center"}}></div>
    </div>
      {/* <div style={{ display: "flex", flexDirection: "column", overflow: "scroll"}} > */}
       <div class="hl" style = {{alignSelf: "center", position: "absolute"}}></div>
        <Element
          name="test7"
          className="element"
          id="containerElement"
          style={{
            position: "relative",
            height: "800px",
            overflow: "scroll",
            marginTop: "25px",
            marginLeft: "20px",
            marginRight: "20px"
          }}
        >
          <Element
            name="firstInsideContainer"
            style={{
              color: "#D1D1D1",
              fontSize: "14px",
              fontWeight: "300",
            }}
          >
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>I'm here to tell you tonight, we believe we're on track to win this election.  </p>
            <br></br>
<p>From The New York Times, I'm Michael Barbaro. This is the daily. Today. </p>
<br></br>
<p>So we'll be going to the US Supreme Court. We want all voting to stop. It ain't over till every vote is counted. Every ballot is counted.</p>
<br></br>
<p>Joe Biden is calling for patience and President Trump is threatening legal action as millions of votes are still uncounted. </p>
<br></br>
<p>We don't want them to find any ballots at four o'clock in the morning and add them to the list. Okay.</p>
<br></br>
<p>It's going to take time to count the votes. And by the way. We're going to win, Pennsylvania.</p>
<br></br>
<p>Alex burns on where the election stands and the remaining paths to Victory. We were getting ready to win this election. rankly. We did win this election. </p>
<br></br>
<p>It's Wednesday, November 4th. As ballot counting continued overnight Joe Biden expanded his lead in Arizona and took slight leads into crucial Midwestern states, Wisconsin and Michigan where mail-in ballots heavily favored him in Pennsylvania. Biden has won the counted absentee ballots by an overwhelming margin so far and the times reports that if he carries the remaining ballots by a similar margin, he would win the state.</p>
<br></br>
<br></br>
 <p>Alex you have to unmute yourself. Hello. The reflexes are a little slow at this hour a little bit. Well, good morning, Alex.</p>
 <br></br>
 <br></br>
 <p>It's some kind of warning. Well, it is 1:40 a.m. In the morning. And a lot of people are going to be listening to this in a few hours when they wake up and despite being prepared by you for the real possibility that we would not have a result on Election night and that the race would seem inconclusive I have to say it feels like we're in an even less certain.</p>
 <br></br>
 <br></br>
 <p>And then we had anticipated that feel right to it certainly a less certain situation than I had anticipated because not only do we not know at this hour who has won the presidential race, but the states that you and I talked about as the early bellwethers to see whether the president's electoral map would hold together. We actually don't have calls in any of them except for Florida at this point, which went for the president. Very good sign for him. We don't have a call in North</p>
 <br></br>
 <p>Carolina all of the president is slightly ahead. I don't have a call in Georgia. Also slightly ahead there though. It looks like that outstanding ballots are pretty heavily in Democratic areas. Don't have a call in Arizona where Joe Biden is ahead by a small but seemingly meaningful margin, you know with maybe hours to go in that count. And that's before we even get to the Midwest. So yeah, this is a blurry or picture that I think certainly I had expected or hoped to have at almost two in the morning you seem displeased.</p>
 <br></br>
 Well, it's just you know, you sort of want some kind of maybe not full clarity. We knew there was a strong chance that we wouldn't get that but this is I think first of all a closer election in the polls, I had indicated but even once you get below the level of the poles are closer election than I think we expected the map to give us at this point in the process. Let's drill down into these states that you just mentioned states that we had.
 <br></br>
 <br></br>
 Spected to be called relatively early in the night, Florida, North Carolina, Georgia, Arizona and let's start with Florida. You have long said the scenario in which a Biden Victory would be declared on Election night would be a scenario in which he won Florida a state that was always considered very close. As you said, he did not win Florida the president and so what's the story of what?
 <br></br>
 <br></br>
 Happened there in Florida. It's really a pretty extraordinary one that when you look at the counties across the state that we were watching as indicators for where voters in the middle. We're going we're independent voters over going a Joe Biden did quite well in those places relative to Hillary Clinton for years ago places like what places like Hillsborough County Pinellas County around the city of Tampa up around Jacksonville. He did better than Clinton.
 <br></br>
 <br></br>
 Did four years ago, these are traditionally the places that a Democrat needs to make inroads into republican-leaning areas in order to win Statewide. So based on what I just told you you would think that Joe Biden had probably won the state not so because he really drastically underperformed in Miami-Dade County, which is traditionally the Cornerstone of the Democrats popular vote strategy in Florida. So what happened in Miami,
 <br></br>
 <br></br>
 <p>It well, you wouldn't necessarily have anticipated this based on the way. He ran his first campaign for years ago, but the president appears to have gained ground really significantly with Hispanic and Latino voters and it's a distinctive community in South Florida. It is heavily shaped by the Cuban American population, which is historically much more conservative than Hispanic voters Nationwide, but the president did even better than you expect a republican to do with Cuban.</p>
 <br></br>
 <br></br>
 <p>American voters and with other Hispanic voters in Miami-Dade. So Alex how exactly do you make sense of the way that the Latino and the cuban-american vote broke in this all-important County. What's your sense of what motivated these voters to go with the president in greater numbers? Well, we know that over the last couple of years. The president has made a really concerted effort to improve his standing in South Florida and with Hispanic voters across the State of Florida, and he has done it to a great degree by care.</p>
 <br></br>
 <br></br>
 <p>Rising the Democrats as these left wing radicals who are in League with socialists and who would turn the country into he often doesn't say Cuba offices Venezuela and there is a significant Venezuelan American population in South Florida, but there are clearly voters There For Whom the rhetoric of socialism that you have heard from some folks in the Democratic party, not Joe Biden, but from other very prominent Democrats is a real turnoff and the president and other Democrats in the state. I have really used that to their great political advantage.</p>
 <br></br>
 <br></br>
 Uh-hmm. Okay, North Carolina. This was a state that President Trump won in 2016 narrowly. It was expected to be closed as of this moment. It remains very close. What can you tell us about what's going on there in North Carolina? Well, it is very very close in North Carolina. And it does seem like there is some potential for Biden to close the gap somewhat there he's trailing by about I think it's 77 thousand votes are so right now so a little less than a point.
 <br></br>
 <br></br>
 Half many of the outstanding votes appear to be in democratically in the area. So that is a state that is likely going to be decided on the razor's Edge one way or another but based on what we've seen so far. It looks like the story in North Carolina and the story and many other places is that you know, Biden did improve upon Democratic performance in the state in the cities and especially in Suburban areas, but that President Trump also improved on his performance in more rural areas.
 <br></br>
 <br></br>
 Has and in a state like North Carolina, you have some big cities. You do not have a dominant big city the way you do in a state like Arizona Phoenix and the Phoenix area or even next door in Georgia with the Atlanta metro area being such a force and Statewide politics. And so if you are the Republican candidate you absolutely can make up for setbacks in the suburbs by running up the scoreboard even further and less populous areas of the state. So as a question of
 <br></br>
 <br></br>
 Her math when it comes to a place like North Carolina a rising tide of Voters and we know there was historic turnout in this race in the case of trump. That means a lot of small gains in a lot of rural counties that just add up and up and up and eventually become a victory potentially. That's right. You know, we don't know where that's going to happen in North Carolina when we have all the votes tabulated. We do know that has happened and a couple other places and this is sort of echo of the 2016 election right when I think there was this
 <br></br>
 <br></br>
 Sense reinforced by public polling and private polling by both parties that at the end of the day there just weren't going to be enough rural voters to make up for the president's or at the time candidate Trump's unpopularity and more densely populated areas and that obviously turned out not to be the case. Okay next among this early wave of states is Georgia and this has been a republican stronghold unexpectedly it entered Battleground status this year. And so if Biden was
 <br></br>
 <br></br>
 The pull off Georgia that seemed like it would be a very positive sign for him.
 <br></br>
 <br></br>
 That's right. I'm the fact that it is still so close in Georgia is certainly a hopeful sign for Biden that the president is ahead there by about a hundred and fourteen thousand votes with the remaining vote really concentrated in metro Atlanta. This is a state where unfortunately for you and me there have been some pretty distinctive snafus at the polls a water main break. Oh wow in one crucial facility in Fulton County some difficulties processing ballots.
 <br></br>
 <br></br>
 One of the key Suburban counties around Atlanta. So we are going to be waiting a little while to find out exactly what the tally is in those places not because actually of any of the sort of structural issues with voting and tabulating ballots in the pandemic, but because it's sort of more pedestrian reasons, but what we see there are right now is the president certainly holding his own in rural, Georgia Vice President Biden solidly improving on Hillary Clinton's performance in the Atlanta.
 <br></br>
 <br></br>
 Herbs, and seemingly, you know, he's not carrying these counties. But in this sort of outer ring X urban communities around Atlanta, he does seem to be holding down the president's margins relative to what he got four years ago. So there's clearly right now a path for Biden in that state but it is so close and our colleagues at the upshot estimate that about 10% of the vote is yet to be counted concentrated but not exclusively in Democratic areas and again,
 <br></br>
 <br></br>
 The president's lead right now is a little over a hundred thousand votes in a state where about four and a half million votes have been cast 4.6 million times. Finally in this list is Arizona and this is another state that has long voted Republican in presidential contests, but also has one of the fastest growing populations and Democrats have in many ways been benefiting from the changing demographics there Biden appears.
 <br></br>
 <br></br>
 Likely to flip Arizona tonight, right? So tell us what we saw there today, you know, the situation Arizona is not all that different from what we've seen in Georgia except that we have sort of a clearer picture of the votes from the big metro area in the state Phoenix and the big cities around Phoenix that we have Biden leading by a little more than six points in the state as of this moment when we're talking now, he's up by about a hundred and fifty thousand votes now, there's still out.
 <br></br>
 <br></br>
 Standing balance to count and those might lean a little bit more towards President Trump. But if you look at these states that have come in relatively quickly and in a relatively representative fashion without sort of early votes or election day votes drastically overrepresented. This is certainly the most encouraging one for bite and this is a place where as you say, the growing and changing population has benefited Democrats up and down the ballot. We saw them win a crucial Senate race there and
 <br></br>
 <br></br>
 20:18 and because of Joe Biden's strength not just with the fastest growing parts of Arizona's population, but also with older voters are a lot of retirees in that state that Biden's Improvement on Democrats traditional margins with voters over 65 clearly opened a path there that Hillary Clinton didn't have four years ago. You could almost think of Arizona as looking a little bit like Florida, but without Miami-Dade in the picture that those moderates
 <br></br>
 <br></br>
 Verbs that we were talking about outside of Tampa outside of Jacksonville their communities in Arizona that look somewhat like those except of course there in the desert instead of on the coast and Biden has managed to put together what looks right now like a relatively formidable Coalition there.
 <br></br>
 <br></br>
 We'll be right back.
 <br></br>
 <br></br>
 Even if your team isn't in the same place your work can be you just need a sauna Asana is routines coordinate work. So they know what to do why it matters and how to get it done plus everyone can see the team's plans check progress and discuss things so you can get work done and your team stays a team where there's a sauna there's a way visit a sauna.com the daily to try for free. That's a sauna Asin a I'm Wendy door and I'm an editor on the day.
 <br></br>
 <br></br>
 Lee for most of my adult life I thought of the New York Times as a giant news machine that spit out news stories all day long kind of like a vending machine and I'm embarrassed to say that it wasn't really until I came to work here at the times that I started to think about the reporters behind those news stories and what it takes to get the story in the first place. Sometimes these reporters risked their lives. Sometimes they talk to us at two in the morning. Sometimes they call us from a war zone.
 <br></br>
 <br></br>
 And and not only do they tell us what's happening on the ground wherever they are, but they also give us the context that we need to understand it. If you like hearing from these reporters every day, which I know I do the one thing that you can do to support them. And the daily is to subscribe to the New York Times if you'd like to do that go to nytimes.com subscribe.
 <br></br>
 <br></br>
 So let's talk about everywhere else for months. You have been telling us that both Joe Biden and President Trump have multiple paths to Victory Biden just has more of them. Do we find ourselves now in a moment where Joe Biden's paths have also become narrower and more limited. Yes, we do. I think you'd still rather be Joe Biden and President Trump right now, but you'd rather be Joe Biden two days ago - Joe Biden.
 <br></br>
 <br></br>
 In terms of just how broad a path he appears to have to the presidency. Both of these candidates need a breakthrough in the Upper Midwest and that is a pretty familiar place for us to find ourselves in at this point in a narrowly drawn election night. And when you say Upper Midwest you are referring to well starting with Wisconsin and stretching over to I guess technically not the Upper Midwest but Pennsylvania those blue all states that Hillary Clinton was
 <br></br>
 <br></br>
 Counting on to winner the presidency for years ago. We just continue to have really incomplete picture of what's going on there. So Alex, let's talk about what has to happen in those States for binding to have a path to Victory. Well, if we just stipulate for now that each candidate wins the states where he is currently leading in the South and Southwest that's President Trump narrowly holding on to North Carolina and Georgia, Joe Biden I narrowly holding on
 <br></br>
 <br></br>
 Arizona and Nevada, then our attention shifts to the north to that string of States, Wisconsin, Michigan, Pennsylvania, and you now have both candidates within Striking Distance of 270. And if either of them wins two of those States, the election is over they have almost certainly at that point one 270 Electoral College votes in that scenario if the president wins just Pennsylvania or
 <br></br>
 <br></br>
 At Michigan he hits 270. He cannot win just by picking up a Wisconsin and adding it to the map that I just described. So you are in a pretty deadlock situation until we get clarity in either Pennsylvania or all three of those states that you're looking at a really potentially quite narrow margin in the Electoral College. And the reason why we don't yet have results in those three states, Wisconsin, Pennsylvania and Michigan correct me if I'm wrong is that they are quite slow.
 <br></br>
 <br></br>
 To count mail-in ballots of which there are many in all three. That's right and in especially the state of Pennsylvania either literally not legally allowed to count votes before election day, even if those votes have been cast weeks in advance through mail-in voting. So we are getting a pretty fragmentary picture of these states. If you look at them on our map right now the president is leading in all of them, but that is at least in part because those states are counting election day.
 <br></br>
 <br></br>
 A votes first and Republicans are expected to win the vote on Election Day. You have millions of outstanding balance, especially in Michigan and Pennsylvania that are expected to lean to Joe Biden. We just don't know exactly how many and we don't know exactly by how much they will lean to him. And whether when they are all counted it will be enough to overcome the lead that the president currently has because of election day votes by the way, Alex. Can we talk for a moment about the polling in a place like, Wisconsin?
 <br></br>
 <br></br>
 I feel like I have to hold somebody accountable for that the last time Siena College poll showed Joe Biden up 11 points in Wisconsin, and we don't know the results yet for Wisconsin, but it's looking very close. It's not looking like anything close to an 11 point spread. So what do you make of it? I know you're not responsible for the contents of all poles. But what do you think? Well, I appreciate your saying I'm not responsible for the contents of the Bulls. I'm not a pollster.
 <br></br>
 <br></br>
 But I do have my byline on a lot of stories where we wrote up that polling information that was is getting at it is really bracing to look at the results we have tonight and see that in many cases certainly in Wisconsin as you say they do not line up with what our polls predicted the same is true in Florida. We will see about Arizona that may hold up better there. We will see about Pennsylvania. But yeah clearly the president had a reservoir of support in Wisconsin that our poles missed.
 <br></br>
 <br></br>
 And this is a place where I think it behooves those of us in the media who have our own public polling to in some cases. Listen to the campaigns because the campaign's they can spin you and they can claim that their numbers are different than they are but both sides of this right? It's not just the Trump side. Also, the Biden side said pretty insistently that they did not have the kind of blowout leads that were showing up in some of the media polling and I suspect that an 11 point.
 <br></br>
 <br></br>
 Margin in Wisconsin for fall into that category at this point Alex does President Trump actually have more paths to Victory than Joe Biden. It's sort of an unanswerable question. You know, my inclination is to think not because of what we expect to happen in those northern states where they're still just this fog of uncertainty and I think that when you look particularly at Wisconsin and Michigan State's are quite close to Minnesota and that is a state that Hillary
 <br></br>
 <br></br>
 One four years ago by a kindly tiny margin and the Joe Biden is winning more comfortably as we speak. That's a state that the president targeted because he came so close last time and felt, you know, I can get that last point and a half out of Minnesota. If I really make a push for it that didn't happen for him. So if you look at what happened in Minnesota and sort of apply it to other states in the Upper Midwest that are very similar to it. That's a pretty encouraging picture for Joe Biden but on the other
 <br></br>
 <br></br>
 Side of this if you look at a state like Ohio where the president won by a wide margin for years ago in a more fractured race, he is winning by much the same margin right now in a less fractured race and that margin will probably come down as the remaining votes which are in more democratic areas come in but in Ohio if it's a proxy for parts of Pennsylvania that also might be encouraging to the president. So I'm kind of talking around your question. I think it's not a quite answerable.
 <br></br>
 <br></br>
 Who has more paths right now? I do believe that it is still Biden but not by as much as we expected it to be Alex you had told us that the fate of the presidency and the Senate are closely intertwined that it would be likely that the fortunes of democratic candidates challenging Republican incumbents for Senate seats would be tied to the fortunes of Joe Biden's so given the uncertain nature of the presidential race. Where do things stand?
 <br></br>
 <br></br>
 And in the Senate races, well, I think it's a disappointing night for Democrats in the Senate races. I think we can be more definitive about that than in the presidential race and it's not because there is a sort of unanticipated wild Divergence between Senate races and the presidential race, but because Joe Biden did not do as well as Democrats needed him to in the red States that had a bunch of the targeted Senate seats on the ballot. These are places like, Iowa, Kansas.
 <br></br>
 <br></br>
 Hannah South Carolina, these are states that with the exception of Iowa. Nobody ever thought Biden could carry them. But if he lost them by a modest amount that there was a sense that maybe Democratic Senate candidates could make up the last three or four points on their own. We've not seen that happen in those States. So, you know Senate majority has not been firmly decided for the Republicans. But you know, I sort of talked around your question about who you'd rather be in the presidential race that you know tentatively.
 <br></br>
 <br></br>
 Joe Biden in on the Senate level you'd certainly rather be the Republicans right now. So finally Alex a couple of hours ago. Joe Biden came out and gave a speech where he sounded quite triumphant and said he believed he was on track to win and just now President Trump came out and gave a speech where he sounded very triumphant. He said that as far as he was concerned he had one.
 <br></br>
 <br></br>
 And said he wanted to ask federal courts to stop vote counting because in his mind the race is over. What are we witnessing here? Well, this is a totally irresponsible act by the president and the claims that he made in his remarks on Election night about the state of the race both of the national level and in specific states were just totally false that he said he's already won, North Carolina and Georgia not true.
 <br></br>
 <br></br>
 He said that what Democrats are trying to do by continuing to count ballots is disenfranchising his voters. That's not true. What we heard from Joe Biden was as you say, I think a confident speech but not that kind of, you know, pre-emptive attempt to claim victory and the message was you got to count all the votes and I think that's something that is clearly true. You do have to count all the votes in these States before you call a winner. So, you know, it's a different kind of optimistic spin to put on I think a more precarious situation.
 <br></br>
 <br></br>
 And then bind anticipated at this point. I wouldn't put it on par with what the president did which was just an act of real drastic irresponsibility buttocks. What is that intended to accomplish from the president? Well, it's intended to undermine public faith in the electoral process as it was set up to take place this year and it is intended to make it harder for Joe Biden to claim victory if that is ultimately what happens even if that Victory is legitimately one and
 <br></br>
 <br></br>
 I think you can't be overstated. What a reckless and dangerous thing. It is for a sitting president to do to attack the Democratic process in this way to aggressively so doubt about the legitimacy of votes that were legally cast in an environment where we know there are so many actors foreign and domestic that are so eager to stoke divisions in the country and even encourage civil unrest and the president is not doing
 <br></br>
 <br></br>
 anything to discourage that
 <br></br>
 <br></br>
 So Alex, what are you going to be looking for and ass when you wake up in a few hours on Wednesday morning? And what should people be expecting at this point? Well, it's going to be a little while before I go to sleep because we are expecting more votes out of Wisconsin and Arizona and Nevada and that could really sharpen the picture that we've got. But look I think all through Wednesday we are going to be watching those Midwestern states very closely.
 <br></br>
 <br></br>
 Going to be watching the Atlanta metro area very closely because if Biden edges ahead in Georgia than a lot of the math we talked about gets a lot easier for him. We just won't know whether that's going to happen until the city of Atlanta and its suburbs have fully reported and you know, I'm going to be watching the way the president conducts himself and the way the rest of the Republican Party deals with the fact that he is so brazenly trying to disrupt the peaceful carrying out of the democratic process.
 <br></br>
 <br></br>


 Well, we will check back in with you maybe at 5:59. Okay, I before we go out Alex. Thank you as always and have a good rest of your morning. Thanks a lot. You two.
 <br></br>
 <br></br>


 That's it for the daily. I'm Michael Barbaro. See you tomorrow.

 <br></br>
 <br></br>



 Better help the convenient and affordable online counseling service will match you with the licensed professional with whom you can start communicating in under 48 Hours talk with your counselor in a private online environment. If you are struggling with anxiety or depression or stress right now, you are not alone join the 1 million plus people taking charge of their mental health with the help of an experienced better help counselor. The daily listeners get 10% off your first month at better help.com the daily visit better help.com the daily.

          </Element>

          <Element
            name="secondInsideContainer"
            style={{
            }}
          >
          </Element>
        </Element>
    {/* // <p style={{color: "white", fontSize: "20px", padding: "30px", paddingRight: "130px", overflow: "scroll" }}>
    //
    // </p> */}

    {/* </div> */}
    </Col>
    <Col xs={4} style={{ paddingLeft: "0px", paddingRight: "0px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
    <Container style={{ display: "flex", flexDirection: "column"}}>
    {pinArr}
    </Container>
    <div style = {{}}class="arrow-right"></div>
    <Button onClick={(e) => this.makePin(e)} className = "butt" style = {{borderRadius: "30px 0px 0px 30px", backgroundColor: "#2C3263", borderColor: "#2C3263"}}>
    <img style = {{width: 60, height: 60, paddingTop: 10}} src="/whitepin.png" />
    <p style={{
      color: 'white',
      fontSize: 13,}}>
      PIN IT
      </p>
      </Button>
      </Col>
      <Col id="far_right" xs={3} style={{ justifyContent: "space-between", display: 'flex', flexDirection: 'column', backgroundColor: "#5C719B" }}>
      <Row>
      <div id="comment" className="mt-4 ml-5 mr-4">
      <p className="mb-1" style={{ color: "white", fontSize: "11px" }}>
      David_Wang 2h
      </p>
      <p className = "EuclidFlexLight" style={{ color: "white", fontSize: "12px" }}>Also: Justin reviews the outlook for convertibles and discusses how investors can consider taking advantage of the asset...</p>
      <p className = "EuclidFlexLight" style={{ color: "white", fontSize: "9px", textAlign: "right" }}>Reply</p>
      <Row display="flex" className="ml-1">
      <div class="vl"></div>
      <Col>
      <div id="replies">
      <p className="mb-1" style={{ color: "white", fontSize: "9px" }}>
      David_Wang 2h
      </p>
      <p style={{ color: "white", fontSize: "12px" }}>Also: Justin reviews the outlook for convertibles and discusses how investors can consider taking advantage of the asset...</p>
      <p style={{ color: "white", fontSize: "9px", textAlign: "right" }}>Reply</p>
      </div>

      <div id="replies">
      <p className="mb-1" style={{ color: "white", fontSize: "9px" }}>
      David_Wang 2h
      </p>
      <p style={{ color: "white", fontSize: "12px" }}>Also: Justin reviews the outlook for convertibles and discusses how investors can consider taking advantage of the asset...</p>
      <p style={{ color: "white", fontSize: "9px", textAlign: "right" }}>Reply</p>
      </div>


      </Col>
      </Row>
      </div>
      <div id="comment" className="mt-4 ml-5 mr-4">
      <p className="mb-1" style={{ color: "white", fontSize: "9px" }}>
      David_Wang 2h
      </p>
      <p style={{ color: "white", fontSize: "12px" }}>Also: Justin reviews the outlook for convertibles and discusses how investors can consider taking advantage of the asset...</p>
      <p style={{ color: "white", fontSize: "9px", textAlign: "right" }}>Reply</p>
      <Row display="flex" className="ml-1">
      <div class="vl2"></div>
      <Col>
      <div id="replies">
      <p className="mb-1" style={{ color: "white", fontSize: "9px" }}>
      David_Wang 2h
      </p>
      <p style={{ color: "white", fontSize: "12px" }}>Also: Justin reviews the outlook for convertibles and discusses how investors can consider taking advantage of the asset...</p>
      <p style={{ color: "white", fontSize: "9px", textAlign: "right" }}>Reply</p>
      </div>


      </Col>
      </Row>
      </div>
      </Row>
      <Row>
      <Container style={{ borderRadius: "30px 30px 0px 0px", height: "180px", backgroundColor: "#7597B0", display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: "center", boxShadow: "0px -4px 3px rgba(50, 50, 50, 0.35)" }}>
      <TextField
      id="first-name"
      label="Add Comment"
      margin="normal"
      />
      </Container>
      </Row>
      </Col>
      </Row>
      </Container >



    );
  };
};

export default Discussion
