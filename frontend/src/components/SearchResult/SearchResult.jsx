import React from 'react';
import './SearchResult.css'; // Assuming the CSS file is in the same directory

const SearchPage = () => {
    return (
        <div id="header">
            <div id="topbar">
                <img id="searchbarimage" src="images/googlelogo_color_92x30dp.png" alt="Google Logo" />
                <div id="searchbar">
                    <input id="searchbartext" type="text" value="computer engineering mutex concept" />
                    <button id="searchbarmic">
                        <img src="images/googlemic.png" alt="Google Mic" />
                    </button>
                    <button id="searchbarbutton">
                        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                            </path>
                        </svg>
                    </button>
                </div>

                <div id="boxesicon"></div>
                <div id="bellicon"></div>
                <img id="profileimage" src="images/photo.png" alt="Profile" />
            </div>

            <div id="optionsbar">
                <ul id="optionsmenu1">
                    <li id="optionsmenuactive">All</li>
                    <li>News</li>
                    <li>Videos</li>
                    <li>Images</li>
                    <li>Maps</li>
                    <li>More</li>
                </ul>

                <ul id="optionsmenu2">
                    <li>Settings</li>
                    <li>Tools</li>
                </ul>
            </div>

            <div id="searchresultsarea">
                <p id="searchresultsnumber">About 155,000 results (0.56 seconds) </p>

                <div className="searchresult">
                    <h2>Lock (computer science) - Wikipedia</h2>
                    <a href="https://en.wikipedia.org/wiki/Lock_(computer_science)">https://en.wikipedia.org/wiki/Lock_(computer_science)</a>
                    <p>In computer science, a lock or mutex (from mutual exclusion) is a synchronization mechanism for enforcing limits on access to a resource in an environment where there are many threads of execution.</p>
                </div>

                <div className="searchresult">
                    <h2>Mutual exclusion - Wikipedia</h2>
                    <a href="https://en.wikipedia.org/wiki/Mutual_exclusion">https://en.wikipedia.org/wiki/Mutual_exclusion</a>
                    <p>For the concept in logic and probability theory, see Mutual exclusivity. Two nodes, i and i + 1, being removed simultaneously results in node i + 1 not being removed. In computer science, mutual exclusion is a property of concurrency control, which is instituted...</p>
                </div>

                <div className="searchresult">
                    <h2>What is Mutual Exclusion (Mutex)? - Definition from Techopedia</h2>
                    <a href="https://www.techopedia.com/definition/25629/mutual-exclusion-mutex">https://www.techopedia.com/definition/25629/mutual-exclusion-mutex</a>
                    <p>A mutual exclusion (mutex) is a program object that prevents simultaneous access to a shared resource. This concept is used in concurrent programming with a critical section, a piece of code in which processes or threads access a shared resource. This is furnished with algorithms...</p>
                </div>

                <div className="searchresult">
                    <h2>Mutex vs Semaphore - GeeksforGeeks</h2>
                    <a href="https://www.geeksforgeeks.org/mutex-vs-semaphore">https://www.geeksforgeeks.org/mutex-vs-semaphore</a>
                    <p>It contains well-written, well-thought and well-explained computer science and programming articles. The concept can be generalized using semaphore.</p>
                </div>

                <div className="searchresult">
                    <h2>What is mutex? Webopedia Definition</h2>
                    <a href="https://www.webopedia.com/TERM/M/mutex.html">https://www.webopedia.com/TERM/M/mutex.html</a>
                    <p>In computer programming, a mutual exclusion object (mutex) is a program object that allows multiple program threads to share the same resource, such as file access, but not simultaneously.</p>
                </div>

                <div className="searchresult">
                    <h2>Concurrency - Reader and Writer mutex - Computer Science Stack Exchange</h2>
                    <a href="https://cs.stackexchange.com/questions/64815/reader-and-writer-mutex">https://cs.stackexchange.com/questions/64815/reader-and-writer-mutex</a>
                    <p>Oct 19, 2016 - Let's begin with defining some terms. Semaphore is one form of software implementation for process synchronization. It's an int value that is...</p>
                </div>

                <div className="searchresult">
                    <h2>Concurrency (computer science): If a binary semaphore can be used ...</h2>
                    <a href="https://www.quora.com/Concurrency-computer-science-If-a-binary-semaphore-can-be-used-to-achieve-mutual-exclusion-then-why-does-the-concept-of-a-mutex-exist">https://www.quora.com/Concurrency-computer-science-If-a-binary-semaphore-can-be-used-to-achieve-mutual-exclusion-then-why-does-the-concept-of-a-mutex-exist</a>
                    <p>Mar 29, 2016 - You might want to see What is the difference between a mutex and a semaphore? especially Quora User's answer to it. A binary semaphore is semantically same...</p>
                </div>

                <div className="searchresult">
                    <h2>What is a mutex? - Stack Overflow</h2>
                    <a href="https://stackoverflow.com/questions/34524/what-is-a-mutex">https://stackoverflow.com/questions/34524/what-is-a-mutex</a>
                    <p>Actually, this is just extending the analogy, but you get the idea. The concept is called "mutual exclusion" (short Mutex), and is a way to ensure that only one...</p>
                </div>

                <div className="searchresult">
                    <h2>ELI5: In computer science what is a mutex? : explainlikeimfive ...</h2>
                    <a href="https://www.reddit.com/r/explainlikeimfive/comments/29prmj/eli5_in_computer_science_what_is_a_mutex/">https://www.reddit.com/r/explainlikeimfive/comments/29prmj/eli5_in_computer_science_what_is_a_mutex/</a>
                    <p>Today's fun fact: The word "mutex" is shorthand for "mutual exclusion". The more you know... A mutex is basically a programmatic device that...</p>
                </div>

                <div className="searchresult">
                    <h2>Basics of Mutex and Semaphore (part 1) – geekgirl decodes</h2>
                    <a href="https://geekgirldecodes.com/2016/09/13/mutex-and-semaphore/">https://geekgirldecodes.com/2016/09/13/mutex-and-semaphore/</a>
                    <p>Sep 13, 2016 - The age-old question of what constitutes a mutex and a semaphore is one of the most fundamental concepts that computer science engineers...</p>
                </div>

                <div className="relatedsearches">
                    <h3>Searches related to computer engineering mutex concept</h3>
                    <div className="relatedlists">
                        <ul className="relatedleft">
                            <li>what is <b>mutex</b> and semaphore</li>
                            <li><b>mutex</b> lock c++</li>
                            <li><b>mutex</b> java</li>
                            <li><b>mutex</b> c++</li>
                        </ul>
                        <ul className="relatedright">
                            <li><b>mutex</b> vs lock</li>
                            <li><b>mutex</b> semaphore example</li>
                            <li><b>mutex</b> and semaphore example in c</li>
                            <li><b>mutex</b> c#</li>
                        </ul>
                    </div>
                </div>

                <div className="pagebar">
                    <ul className="pagelist">
                        <li className="pagelistprevious">Previous</li>
                        <li className="pagelistfirst">1</li>
                        <li className="pagelistnumber">2</li>
                        <li className="pagelistnumber">3</li>
                        <li className="pagelistnumber">4</li>
                        <li className="pagelistnumber">5</li>
                        <li className="pagelistnumber">6</li>
                        <li className="pagelistnumber">7</li>
                        <li className="pagelistnumber">8</li>
                        <li className="pagelistnumber">9</li>
                        <li className="pagelistnumber">10</li>
                        <li className="pagelistnext">Next</li>
                    </ul>
                </div>
            </div>

            <div id="footer">
                <div id="footerlocation">
                    <p>Somewhere, Moon</p>
                    <p>- From your phone (Location History) - Use precise location - Learn more</p>
                </div>

                <ul id="footermenu">
                    <li>Help</li>
                    <li>Send feedback</li>
                    <li>Privacy</li>
                    <li>Terms</li>
                </ul>
            </div>
        </div>
    );
};

export default SearchResult;
