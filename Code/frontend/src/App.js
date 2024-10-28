//  
import recipeDB from "./apis/recipeDB";
import React, { Component } from "react";
import Nav from "./components/Navbar.js";
import Login from "./components/Login.js";
import { doSignInWithEmailAndPassword, doCreateUserWithEmailAndPassword, doSignOut } from "./firebase/auth";
import SearchBlock from "./components/SearchBlock.js";

// Main component of the project
class App extends Component {
  // constructor for the App Component
  constructor() {
    super();

    this.state = {
      cuisine: "",
      //NoIngredients : 0,
      ingredients: new Set(),
      recipeList: [],
      recipeByNameList: [],
      email: "",
      flag: false,
      isLoading: false,
      isLoggedIn: false,
      isProfileView: false,
      showLoginModal: false,
      userData: {}
    };
  }

  handleBookMarks = () => {
    this.setState({
      isProfileView: true
    })
  }

  handleProfileView = () => {
    this.setState({
      isProfileView: false
    })
  }

  toggleLoginModal = () => {
    this.setState((prevState) => ({ showLoginModal: !prevState.showLoginModal }));
  };

  handleSignup = async (email, password) => {
    try {
      const userCredential = await doCreateUserWithEmailAndPassword(email, password);
      this.setState({
        isLoggedIn: true,
        currentUser: userCredential.user,
        showLoginModal: false,
      });
      alert("Successfully Signed up!");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  // Handle user login
  handleLogin = async (email, password) => {
    try {
      const userCredential = await doSignInWithEmailAndPassword(email, password);
      this.setState({
        isLoggedIn: true,
        currentUser: userCredential.user,
        showLoginModal: false,
      });
      alert("Successfully logged in!");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  // Function to get the user input from the Form component on Submit action
  handleSubmit = async (formDict) => {
    this.setState({
      isLoading: true
    })
    console.log(formDict)
    this.setState({
      // cuisine: cuisineInput,
      //NoIngredients: noIngredientsInput,
      ingredients: formDict["ingredient"],
      cuisine: formDict["cuisine"],
      email: formDict["email_id"],
      flag: formDict["flag"],
    });

    const mail = formDict["email_id"];
    const flag = formDict["flag"];
    const items = Array.from(formDict["ingredient"]);
    const cuis = formDict["cuisine"];
    this.getRecipeDetails(items, cuis, mail, flag);
    //  alert(typeof(ingredientsInput["cuisine"]));
  };

  handleRecipesByName = (recipeName) => {
    this.setState({
      isLoading: true
    })
    recipeDB.get("/recipes/getRecipeByName", {
      params: {
        recipeName: recipeName
      }
    }).then(res => {
      console.log(res.data);
      this.setState({
        recipeByNameList: res.data.recipes,
        isLoading: false
      })
    })
  }

  getRecipeDetails = async (ingredient, cuis, mail, flag) => {
    try {
      const response = await recipeDB.get("/recipes", {
        params: {
          CleanedIngredients: ingredient,
          Cuisine: cuis,
          Email: mail,
          Flag: flag,
        },
      });
      this.setState({
        recipeList: response.data.recipes,
        isLoading: false
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Handle logout
  handleLogout = async () => {
    try {
      await doSignOut();
      this.setState({
        isLoggedIn: false,
        showLoginModal: false,
        currentUser: null,
      });
      alert("Logged out successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to log out");
    }
  }

  render() {
    return (
      <div>
        <Nav
          handleLogout={this.handleLogout}
          handleBookMarks={this.handleBookMarks}
          currentUser={this.state.currentUser}
          toggleLoginModal={this.toggleLoginModal}
        />
        {this.state.showLoginModal && (
          <Login handleSignup={this.handleSignup} handleLogin={this.handleLogin} toggleLoginModal={this.toggleLoginModal} />
        )}
        <SearchBlock />
        {/*
        <>
          {this.state.isProfileView ? (
            <UserProfile handleProfileView={this.handleProfileView} currentUser={this.state.currentUser} />
          ) : (
            <Tabs variant="soft-rounded" colorScheme="green">
              <TabList ml={10}>
                <Tab>Search Recipe</Tab>
                <Tab>Search Recipe By Name</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box display="flex">
                    <Form sendFormData={this.handleSubmit} />
                    {this.state.isLoading ? <RecipeLoading /> : <RecipeList recipes={this.state.recipeList} />}
                  </Box>
                </TabPanel>
								<TabPanel>
									<AddRecipe />
								</TabPanel>
                <TabPanel>
                  <SearchByRecipe sendRecipeData={this.handleRecipesByName} />
                  {this.state.isLoading ? <RecipeLoading /> : <RecipeList recipes={this.state.recipeByNameList} />}
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </>
          */}
      </div>
    );
  }
}

export default App;
