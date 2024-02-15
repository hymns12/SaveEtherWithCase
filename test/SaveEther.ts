import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SaveEther", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  async function deploySaveEther() {
    

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const SaveEther = await ethers.getContractFactory("SaveEther");
    const saveether = await SaveEther.deploy();

    return { saveether, owner, otherAccount, };
  }

  describe(" chacking four Deployment", function () {
    it("can depolt", async function () {
      const { saveether, owner } = await loadFixture(deploySaveEther);
      
      
      await saveether.deposit({value: 1});

      const balances = await saveether.checkSavings(owner.address)
      expect(balances).to.equal(1);
    })

    it("Chack if the contract has deploy", async function () {

      const { saveether } = await loadFixture(deploySaveEther);
      const checkContractBal = await saveether.checkContractBal();
      

      expect(checkContractBal).to.equal(0);
    });


  describe("withdraw for the deposit", function () {

      it("Widthraw the money form the accunt", async function () {

        const { saveether, owner } = await loadFixture(deploySaveEther);

        await saveether.deposit({value: 1});

        const balances = await saveether.checkContractBal();

        expect(balances).to.equal(1);

        await saveether.withdraw();

        const newBalances = await saveether.checkSavings(owner);

        expect(newBalances).to.equal(0);
      });



      it("checkSavings", async function () {

        const { saveether, owner } = await loadFixture(deploySaveEther);

        await saveether.deposit({value: 1});

        const balances = await saveether.checkContractBal();

        expect(balances).to.equal(1);

        await saveether.withdraw();

        const newBalances = await saveether.checkSavings(owner);

        expect(newBalances).to.equal(0)



        // We use lock.connect() to send a transaction from another account
        // await expect(saveether.connect(otherAccount).withdraw()).to.be.revertedWith("You aren't the owner");
      });

      it("sendOutSaving", async function () {

        const { saveether, owner, otherAccount } = await loadFixture(deploySaveEther);

        await saveether.deposit({value: 1});

        const balances = await saveether.checkContractBal();

        expect(balances).to.equal(1);

        await saveether.sendOutSaving(owner, otherAccount);

        const sender = await saveether()

        

        // await expect(saveether.withdraw()).not.to.be.reverted;
      });

    // describe("Events", function () {
    //   it("Should emit an event on withdrawals and when ever the withdrawls is savingSuccessful", async function () {

    //     const { saveether, otherAccount, owner } = await loadFixture(deploySaveEther);


    //     // await time.increaseTo(unlockTime);

    //     await expect(saveether.withdraw())
    //       .to.emit(otherAccount, "Withdrawal")
    //       .withArgs(otherAccount, anyValue); // We accept anylockedAmount value as `when` arg
    //   });
    // });

  //   // describe("Transfers", function () {
  //   //   it("Should transfer the funds to the owner", async function () {
  //   //     const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //   //       deployOneYearLockFixture
  //   //     );

  //   //     await time.increaseTo(unlockTime);

  //   //     await expect(lock.withdraw()).to.changeEtherBalances(
  //   //       [owner, lock],
  //   //       [lockedAmount, -lockedAmount]
  //   //     );
  //   //   });
  //   // })
  });
  
})
});
