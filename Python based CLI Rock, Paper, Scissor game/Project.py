import random
def register():
        print("=================================================================")
        print("    Hello New User!! To register enter the following details     ")
        name=input("Enter Your Name: ")
        userid=input("Enter Your User Id: ")
        password=input("Enter Your Password: ")
        cpassword=input("Re-enter your password to confirm: ")
        if(password==cpassword):
                info=name+";"+userid+";"+password
                fh=open("Credentials.txt","a")
                fh.write(info)
                fh.write('\n')
                print("Registratin Done.")
                fh.close()
                login()
        else:
                print("Your Password and Confirm Password doesnot match. Please register again.")
                register()


def login():
        print("=================================================================")
        print("               Hello Player!! Please Login to continue.          ")
        uid=input("Enter User Id: ")
        pas=input("Enter Password: ")
        fh=open("Credentials.txt","r")
        result=fh.read()
        lst2=result.split('\n')
        for i in lst2:
                lst3=i.split(';')
                if(i!=''):
                        if(uid==lst3[1]):
                                if(pas==lst3[2]):
                                        print("Login Successfull")
                                        name=lst3[0]
                                        rpsgame(name)
                                        break
                                else:
                                        print("Invalid Password")
                                        break
                        else:
                                continue
                else:
                        print("No Records Found!! Please Register")
                        break



def rpsgame(name):
        extt=1
        while(extt==1):
                i=1
                pscore=0
                cscore=0
                print("=================================================================")
                while(i<=7):
                    print("ROUND ",i)
                    pchoice=input("Enter Your choice from 'Rock','Paper','Scissor': ")
                    lst=['Rock','Paper','Scissor']
                    cchoice=random.choice(lst)
                    print("The computer choose: ",cchoice)
                    if(pchoice=='Rock' and cchoice=='Paper'):
                        cscore=cscore+1
                        print("Computer win round ",i)
                        print(name," score: ",pscore," and Computer score: ",cscore)
                        print("---------------------------------------------------------")
                        i=i+1
                    elif(pchoice=='Rock' and cchoice=='Scissor'):
                        pscore=pscore+1
                        print(name," win round ",i)
                        print(name," score: ",pscore," and Computer score: ",cscore)
                        print("---------------------------------------------------------")
                        i=i+1
                    elif(pchoice=='Rock' and cchoice=='Rock'):
                        print("Round ",i," is a tie")
                        print(name," score: ",pscore," and Computer score: ",cscore)
                        print("---------------------------------------------------------")
                        i=i+1
                    elif(pchoice=='Paper' and cchoice=='Paper'):
                        print("Round ",i," is a tie")
                        print(name," score: ",pscore," and Computer score: ",cscore)
                        print("---------------------------------------------------------")
                        i=i+1
                    elif(pchoice=='Paper' and cchoice=='Rock'):
                        pscore=pscore+1
                        print(name," win round ",i)
                        print(name," score: ",pscore," and Computer score: ",cscore)
                        print("---------------------------------------------------------")
                        i=i+1
                    elif(pchoice=='Paper' and cchoice=='Scissor'):
                        cscore=cscore+1
                        print("Computer win round ",i)
                        print(name," score: ",pscore," and Computer score: ",cscore)
                        print("---------------------------------------------------------")
                        i=i+1
                    elif(pchoice=='Scissor' and cchoice=='Scissor'):
                        print("Round ",i," is a tie")
                        print(name," score: ",pscore," and Computer score: ",cscore)
                        print("---------------------------------------------------------")
                        i=i+1
                    elif(pchoice=='Scissor' and cchoice=='Rock'):
                        cscore=cscore+1
                        print("Computer win round ",i)
                        print(name," score: ",pscore," and Computer score: ",cscore)
                        print("---------------------------------------------------------")
                        i=i+1
                    elif(pchoice=='Scissor' and cchoice=='Paper'):
                        pscore=pscore+1
                        print(name," win round ",i)
                        print(name," score: ",pscore," and Computer score: ",cscore)
                        print("---------------------------------------------------------")
                        i=i+1
                    else:
                        print("PLEASE ENTER A VALID CHOICE!!")
                print("All the rounds are completed")
                if(pscore>cscore):
                    print("Congratulations ",name,"!! You has won the match")
                    msg="Match between "+name+" and Computer is won by "+name+" by "+str(pscore)+"-"+str(cscore)+".\n"
                    filehandle=open("Records.txt","a")
                    filehandle.write(msg)
                    filehandle.close()
                elif(pscore==cscore):
                    print("This game ends in a draw well tried.")
                    msg="Match between "+name+" and Computer is a tie by score "+str(pscore)+"-"+str(cscore)+".\n"
                    filehandle=open("Records.txt","a")
                    filehandle.write(msg)
                    filehandle.close()
                else:
                    print("Sorry!! The computer won this match")
                    msg="Match between "+name+" and Computer is won by Computer by "+str(cscore)+"-"+str(pscore)+".\n"
                    filehandle=open("Records.txt","a")
                    filehandle.write(msg)
                    filehandle.close()
                extt=int(input("To Continue Press 1 or 0 to go back to main menu: "))

def viewhistory():
        print("=================================================================")
        print("               Welcome to Rock Paper Scissor Records             ")
        filehandle=open("Records.txt","r")
        data=filehandle.read()
        print(data)
        filehandle.close()

ext=1
while(ext==1):
    print("=================================================================")
    print("               Rock Paper Secissor game in Python                ")
    print("=================================================================")
    print("        Press 1 to register and play Rock Paper Secissor Game    ")
    print("        Press 2 to login and play Rock Paper Secissor Game       ")
    print("        Press 3 to view history of matches             ")
    print("        Press 0 to exit the program                    ")
    ch=int(input("        Enter your choice: "))
    if(ch==1):
        register()
    elif(ch==2):
        login()
    elif(ch==3):
        viewhistory()
    elif(ch==0):
        ext=0
        print("Thank You for using this application!!")
    else:
        print("Invalid input! Please try again")
