/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        
        it("has url of each feed defined", function() {
            allFeeds.forEach(function(element) {
                expect(element.url).toBeDefined();
                expect(element.url.constructor).toBe(String);
                expect(element.url.length).not.toBe(0);
            })
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("has name of each feed defined", function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.constructor).toBe(String);
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it("is hidden by default", function() {
            let body = document.querySelector("body");
            expect(body.className).toEqual("menu-hidden");
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it("shows the menu if clicked once and hides if clicked twice", function() {
            let targetedMenuIcon = document.querySelector("a.menu-icon-link");

            //Simulating Click
            targetedMenuIcon.click();

            expect(document.querySelector("body").className).not.toBe("menu-hidden");

            //Simulating Click again
            targetedMenuIcon.click();

            expect(document.querySelector("body").className).toBe("menu-hidden");
        })
        
    });
        

        

        

    /* TODO: Write a new test suite named "Initial Entries" */
    
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(1, done);
        });

        it("contains atleast one feed", function() {
            let feedContainer = document.querySelector("div.feed");
            let entries = feedContainer.querySelectorAll("article.entry");
            expect(entries.length).toBeGreaterThan(0);
        });
    });
        

        

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let feed1;
        let feed2;

        beforeEach(function(done){
            loadFeed(2, function() {
                feed1 = document.querySelector("div.feed").innerHTML;
                loadFeed(1, function() {
                    feed2 = document.querySelector("div.feed").innerHTML;
                    done();
                });
            });
        });

        it("loads new feed with changed content", function() {
            expect(feed1).not.toBe(feed2);
        });
    });    
}());
