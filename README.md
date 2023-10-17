# create-ds-boilerplate

A CLI tool to scaffold design system component libraries.

### Local Development and Testing

To test and develop this tool locally, you can utilize npm link which will allow you to run the tool from any directory on your machine.

Steps:
1. Clone the Repository:

First, clone the repository to your local machine.

```
git clone https://github.com/hoshikitsunoda/create-ds-boilerplate.git
cd create-ds-boilerplate
```

2. Install Dependencies:

Install the necessary dependencies for the project.

```
npm install
```

3. Link the Package Globally:

Run the following command to link the package globally.

```
npm link
```

4. Run the Tool:

Now, you can navigate to any directory and run:

```
create-ds-boilerplate
```

5. Unlink the Package (Optional):

Once you're done with local testing, or if you want to remove the global link, navigate back to the project directory and run:

```
npm unlink
```
