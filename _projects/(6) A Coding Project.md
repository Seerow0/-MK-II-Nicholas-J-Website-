---
name: Coding
tools: [C#, Html, Markdown]
image: https://raw.githubusercontent.com/Seerow0/-MK-II-Nicholas-J-Website-/main/gifs/code-frustration(2).gif
description: Unity Coding Scripts
---

* TOC
{:toc}

# Music Slider
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI; 


public class ChangeMusicVolume : MonoBehaviour {



	public Slider Volume;
	public AudioSource myMusic;
	
	// Update is called once per frame
	void Update () {
		myMusic.volume = Volume.value;
	}
}

---------------------------------------

# Time Destroy

using UnityEngine;
using System.Collections;

public class DestroyByTime : MonoBehaviour
{
    public float lifetime;

    void Start()
    {
        Destroy(gameObject, lifetime);
    }
} 

------------------

# On Trigger

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class OnTrigger : MonoBehaviour {


	public KeyCode MyKey;
	public string MyTrigger;

	void Update ()
	{
		if (Input.GetKey (MyKey)) {
			GetComponent<Animator> ().SetTrigger (MyTrigger);
		}
	}
}

---------------------------

# Pause Menu

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class PauseMenu : MonoBehaviour {

	public static bool gameispaused = false;

	public GameObject pauseMenuUI;
	// Update is called once per frame
	void Update () {

		if (Input.GetKeyDown(KeyCode.Escape))
			
		{
	if (gameispaused)
				
	{
		Resume();

	} else 
	{
		Pause();
}
			//Screen.lockCursor = false;
			//Screen.lockCursor = true;
}

}
public void Resume()
{
	pauseMenuUI.SetActive(false);
	Time.timeScale = 1f;
	gameispaused = false;
	Screen.lockCursor = true;
}
void Pause ()

{
	pauseMenuUI.SetActive(true);
	Time.timeScale = 0f;
	gameispaused = true; 
	Screen.lockCursor = false;
	
}
	public void LoadMenu()
	{
		Time.timeScale = 1f; 
		SceneManager.LoadScene ("Menu");
	}
	public void QuitGame()
	{
		Debug.Log("Quitting game...");
		Application.Quit ();
	}
}

--------------------

# PlaySoundOnPress

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlaySoundOnPress : MonoBehaviour
{
    public AudioSource someSound;
    // Use this for initialization
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.U))
        {
            someSound.Play();
        }
    }
}

# Roll Anim

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Roll : MonoBehaviour {
//	public Animator anim;
//	// Use this for initialization
//	void Start () {
//		anim = GetComponent<Animator> ();
//	}
//	
//	// Update is called once per frame
//	void Update () {
//		if (Input.GetKeyDown ("1"));
//		{
//			anim.Play ("roll");
//		}
//	}
//}
	public bool roll;


	void Start()
	{
		roll = false;
	}

	void Update()
	{
		if (Input.GetButton("1"))
		{
			roll = true;
		}
		else
		{
			roll = false;
		}
	}
}

----------------

# Splash Sequence

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SplashSequence : MonoBehaviour {

	public static int SceneNumber;
	// Use this for initialization
	void Start () {
		if (SceneNumber == 0) {
			StartCoroutine (ToSplashTwo());
	}
		if (SceneNumber == 1) {
			StartCoroutine (ToMainMenu ());
		}

	}
	IEnumerator ToSplashTwo () {
		yield return new WaitForSeconds (5);
		SceneNumber = 1;
		SceneManager.LoadScene (1);
	}
	IEnumerator ToMainMenu () {
		yield return new WaitForSeconds (5);
		SceneNumber = 2;
			SceneManager.LoadScene (2);
}
}

-----
 # Death Trigger

 

  using UnityEngine;
using System.Collections;

public class deathtrigger : MonoBehaviour


{

    public bool death;
    private GameObject player;
    private Animator anim;
    private AudioClip sound;

    // Use this for initialization
    void Start()
    {
    }

    // Update is called once per frame
    void Update()
    {
        anim = GetComponent<Animator>();
    }

    void OnTriggerEnter(Collider other)
    {
        anim.SetBool("death", true);
        GetComponent<AudioSource>().Play();
    }

    void OnTriggerExit(Collider other)
    {
        anim.SetBool("death", false);
    }
}

--------------

# Detect Hit

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class detecthit : MonoBehaviour {
    // public SimpleHealthBar healthBar;
    public Slider healthbar;
   Animator anim;


    void OnTriggerEnter(Collider other)
    {
        //Debug.Log("Hit");
        //healthBar.UpdateBar(90,100);//100-90 is 10 damage//90,100//
        //if (healthBar.UpdateBar(90,100)) ;
        healthbar.value -= 2;
        if(healthbar.value <=0)
        anim.SetBool("death", true);
      // healthbar.value -= 20;

       
    }

    void Start()
    {
        anim = GetComponent<Animator>();
    }
    void Update()
    {

    }
}

----------

# Don't Destroy

using System.Collections;

using UnityEngine;

public class dontdestroy : MonoBehaviour {

    void Awake()
    {
        GameObject[] objs = GameObject.FindGameObjectsWithTag("music");
        if (objs.Length > 1)
            Destroy(this.gameObject);
            DontDestroyOnLoad(this.gameObject);

    }
}
------
# Main Menu

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class mainmenu : MonoBehaviour {

	public void PlayGame ()
	{ 
SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
}



	public void QuitGame ()
	{
		Debug.Log ("QuitGame!");
		Application.Quit ();
	}

}

------

# Reload-On-Death-Collider

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class reloaddie : MonoBehaviour
{




    void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.tag == "spikes")
        {
            SceneManager.LoadScene("Official2");
            //Or:
            //SceneManager.LoadScene (SceneIndex); //(without these: ", because it's a number - an int, not a string)
        }
    }
}

-----
# Reload_Alt
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class reloaddie1 : MonoBehaviour
{




    void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.tag == "final")
        {
            SceneManager.LoadScene("FinalScene");
            //Or:
            //SceneManager.LoadScene (SceneIndex); //(without these: ", because it's a number - an int, not a string)
        }
    }
}

------

# Respawn

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class respawn : MonoBehaviour {


		[SerializeField]private Transform player;
		[SerializeField]private Transform respawnPoint;

		void OnTriggerEnter(Collider other)
	{
		

			player.transform.position = respawnPoint.transform.position;
		}
	}

 -----
# Audio On Collision

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AudioOnCollision : MonoBehaviour
{
    AudioSource source;

    void Start()
    {
        source = GetComponent<AudioSource>();
    }

    private void OnCollisionEnter(Collision collision)
    {
        source.Play();
    }

}

----

# Collector
using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;
//using UnityEngine.Audio;
public class collector : MonoBehaviour {
	//public AudioClip SoundToPlay;

	//fixing FIXME_VAR_TYPE is always tricky solution as per how to script or object using and accessing it. Type Object and GameObject are good option for it, but not mostly, morethan 90% var type is float or vector3
	//FIXME_VAR_TYPE score= 0; 
	float score = 0;
	//GUIText guiScore; 
	bool  nextLevel;

	void  OnTriggerEnter ( Collider other  ){ 
		Debug.Log("OnTriggerEnter() was called"); 
		if (other.tag == "collector") 
		{ 
			score += 1; 
			AddScore ();
			//guiScore.text = "Score: " + score; 
			Debug.Log("Score is now " + score);
            

			//Destroy(other.gameObject);
			//yield WaitForSeconds(5).(audio.clip.length);
			//yield return new WaitForSeconds (5);
			//other is the gameobject


				

		} 
			
	} 
	void  AddScore (){ 
		score++; if( score == 6 ) {Destroy(GameObject.Find("twinblock"));
    }
	}
}

-----

# Load Scene Delay


using UnityEngine;
//using UnityEngine.SceneManagement;


public class delayloadscene : MonoBehaviour
{
    [SerializeField]
    private float delayBeforeLoading = 10f;
    [SerializeField]
    private string scenenametoload;

    private float timeElasped;

    private void Update()
    {

        {
            timeElasped += Time.deltaTime;
            if (timeElasped > delayBeforeLoading)
            {
                //SceneManager.LoadScene(scenenametoload);
                Application.Quit();
                print("quitbich");
            }
            
        }
    }

}

----

# Destroyer
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class destroyer : MonoBehaviour
{

    public float lifeTime = 10f;

    // Update is called once per frame
    void Update()
    {
        if (lifeTime > 0)
        {
            lifeTime -= Time.deltaTime;
            if (lifeTime <= 0)
            {
                Destruction();
            }
        }

        if (this.transform.position.y <= -20)
        {
            Destruction();
        }
    }

    void OnCollisionEnter(Collision coll)
    {
        if (coll.gameObject.name == "destroyer")
        {
            Destruction();
        }
    }

    void Destruction()
    {
        Destroy(this.gameObject);
    }
}

----

# Three Camera's Display

using UnityEngine;
using System.Collections;
//REMEMBER NICK, DISPLAY 0 IS FIRST CAMERA AUTOMATICALLY ON

public class DisplayScript : MonoBehaviour
{
    // Use this for initialization
    void Start()
    {
        Debug.Log("displays connected: " + Display.displays.Length);
        // Display.displays[0] is the primary, default display and is always ON.
        // Check if additional displays are available and activate each.
        if (Display.displays.Length > 1)//2ND CAMERA
            Display.displays[1].Activate();
        if (Display.displays.Length > 2)//THIRDCAMERA
            Display.displays[2].Activate();
       if (Display.displays.Length > 3)
            Display.displays[3].Activate();
        


    }
    // Update is called once per frame
    void Update()
    {

    }
}

----

# AI Script 1

using UnityEngine;
using System.Collections;

public class dmediumai : MonoBehaviour
{

    public GameObject ThePlayer;
    public float TargetDistance;
    public float AllowedRange = 10;
    public GameObject TheEnemy;
    public float EnemySpeed;
    public int AttackTrigger;
    public RaycastHit Shot;

    public int IsAttacking;
    public GameObject ScreenFlash;
    public AudioSource Hurt01;
    public AudioSource Hurt02;
    public AudioSource Hurt03;
    public int PainSound;

    void Update()
    {
        transform.LookAt(ThePlayer.transform);
        if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), out Shot))
        {
            TargetDistance = Shot.distance;
            if (TargetDistance < AllowedRange)
            {
                EnemySpeed = 0.01f;
                if (AttackTrigger == 0)
                {
                    TheEnemy.GetComponent<Animation>().Play("dmedium");
                    transform.position = Vector3.MoveTowards(transform.position, ThePlayer.transform.position, EnemySpeed);
                }
            }
            else
            {
                EnemySpeed = 0;
                TheEnemy.GetComponent<Animation>().Play("dmedium");
            }
        }

        if (AttackTrigger == 1)
        {
            if (IsAttacking == 0)
            {
                StartCoroutine(EnemyDamage());
            }
            EnemySpeed = 0;
            TheEnemy.GetComponent<Animation>().Play("dmedium");
        }
    }

    void OnTriggerEnter()
    {
        AttackTrigger = 1;
    }

    void OnTriggerExit()
    {
        AttackTrigger = 0;
    }


    IEnumerator EnemyDamage()
    {
        IsAttacking = 1;
        PainSound = Random.Range(1, 4);
        yield return new WaitForSeconds(0.1f);
        ScreenFlash.SetActive(true);
        GlobalHealth.PlayerHealth -= 1;
        print("minusone");
        if (PainSound == 1)
        {
            Hurt01.Play();
        }
        if (PainSound == 2)
        {
            Hurt02.Play();
        }
        if (PainSound == 3)
        {
            Hurt03.Play();
        }
        yield return new WaitForSeconds(2.5f);
        ScreenFlash.SetActive(false);
        yield return new WaitForSeconds(1);
        IsAttacking = 0;

    }



}

----

# Enemy Destroy

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
//nickyougotthisbuddy
public class enemydestroy : MonoBehaviour
{
   public int life = 0;

    //public void OnCollisionEnter(Collision boom)
    // {
    //If the object that triggered this collision is tagged "bullet"
    // if (gameObject.tag == "bullet")
    //  {
    //     life += 1;
    //    print("hit");
    //   if (life >= 3)
    // gameObject.GetComponent<Animator>().enabled = false;
    //     Destroy(gameObject);
    // }
    //}
    //}
    void OnCollisionEnter(Collision collision)
    {
        if (collision.collider.gameObject.tag == "bullet")
        {
            life += 1;
               print("hit");
            if (life >= 3)
                // Destroy(gameObject);
                  gameObject.SetActive(false);
                //SetKinematic(false);
            //GetComponent<Animator>().enabled = false;
        }
    }
}

----

# Explode

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class explode : MonoBehaviour
    
{
    public float minForce;
    public float maxForce;
    public float radius;
    public float destroyDelay;

    void Start ()
{        Explode();
        }

    public void Explode()
  {
        foreach (Transform t in transform)
        {
         var rb = t.GetComponent<Rigidbody> ();
            if(rb != null) {
                rb.AddExplosionForce (Random.Range (minForce, maxForce), transform.position,radius);
            }
            Destroy(t.gameObject, destroyDelay);
        }
    }
}

----

# Final Obstacle Score Counter

using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;
//using UnityEngine.Audio;
public class FinalObstacleScore : MonoBehaviour {

    public float destroyDelay;
    public float sceneDelay;
    //public AudioClip SoundToPlay;

    //fixing FIXME_VAR_TYPE is always tricky solution as per how to script or object using and accessing it. Type Object and GameObject are good option for it, but not mostly, morethan 90% var type is float or vector3
    //FIXME_VAR_TYPE score= 0; 
    float score = 0;
	//GUIText guiScore; 
	bool  nextLevel;

	void  OnTriggerEnter ( Collider other  ){ 
		Debug.Log("OnTriggerEnter() was called"); 
		if (other.tag == "dog") 
		{ 
			score += 1; 
			AddScore ();
			//guiScore.text = "Score: " + score; 
			Debug.Log("Score is now " + score);
            

			//Destroy(other.gameObject);
			//yield WaitForSeconds(5).(audio.clip.length);
			//yield return new WaitForSeconds (5);
			//other is the gameobject


				

		} 
			
	} 
	void  AddScore (){ 
		score++; if( score == 2 )
        { Destroy(GameObject.Find("Giant"), destroyDelay);
          
            SceneManager.LoadSceneAsync("lis2");
            // Application.Quit();
            // print("quitbich"); 
        }
	}
}

----

# Flickering Light

using UnityEngine;
using System.Collections;

public class flickeringlight : MonoBehaviour
{


    Light testLight;
    public float minWaitTime;
    public float maxWaitTime;

    void Start()
    {
        testLight = GetComponent<Light>();
        StartCoroutine(Flashing());
    }

    IEnumerator Flashing()
    {
        while (true)
        {
            yield return new WaitForSeconds(Random.Range(minWaitTime, maxWaitTime));
            testLight.enabled = !testLight.enabled;

        }
    }
}

----

# Floater

using UnityEngine;
using System.Collections;

// Makes objects float up & down while gently spinning.
public class Floater : MonoBehaviour {
	// User Inputs
	public float degreesPerSecond = 15.0f;
	public float amplitude = 0.5f;
	public float frequency = 1f;

	// Position Storage Variables
	Vector3 posOffset = new Vector3 ();
	Vector3 tempPos = new Vector3 ();

	// Use this for initialization
	void Start () {
		// Store the starting position & rotation of the object
		posOffset = transform.position;
	}

	// Update is called once per frame
	void Update () {
		// Spin object around Y-Axis
		//transform.Rotate(new Vector3(0f, Time.deltaTime * degreesPerSecond, 0f), Space.World);

		// Float up/down with a Sin()
		tempPos = posOffset;
		tempPos.y += Mathf.Sin (Time.fixedTime * Mathf.PI * frequency) * amplitude;

		transform.position = tempPos;
	}
}

----

# Floater 2

using UnityEngine;
using System.Collections;

// Makes objects float up & down while gently spinning.
public class Floater2 : MonoBehaviour {
	// User Inputs
	public float degreesPerSecond = 15.0f;
	public float amplitude = 0.5f;
	public float frequency = 1f;

	// Position Storage Variables
	Vector3 posOffset = new Vector3 ();
	Vector3 tempPos = new Vector3 ();

	// Use this for initialization
	void Start () {
		// Store the starting position & rotation of the object
		posOffset = transform.position;
	}

	// Update is called once per frame
	void Update () {
		// Spin object around Y-Axis
		transform.Rotate(new Vector3(0f, Time.deltaTime * degreesPerSecond, 0f), Space.World);

		// Float up/down with a Sin()
		tempPos = posOffset;
		tempPos.y += Mathf.Sin (Time.fixedTime * Mathf.PI * frequency) * amplitude;

		transform.position = tempPos;
	}
}

----

# GLobal Health

//GLOBAL HEALTH
using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GlobalHealth : MonoBehaviour
{

    public static int PlayerHealth = 10;
    public int InternalHealth;
    public GameObject HealthDisplay;

    void Update()
    {
        InternalHealth = PlayerHealth;
        HealthDisplay.GetComponent<Text>().text = "Health: " + PlayerHealth;
        if (PlayerHealth == 0)
        {
            SceneManager.LoadScene("GameOver");
        }
    }
}

----

# Load Scene On Collision

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class loadsceneoncollision : MonoBehaviour
{
    void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.tag == "Block")
        {
            SceneManager.LoadSceneAsync("level2");
            //SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex - 1);
            //Or:
            //SceneManager.LoadScene (SceneIndex); //(without these: ", because it's a number - an int, not a string)
        }
       // {
           // DontDestroyOnLoad(this.gameObject);
        //}
    }
}

----

# Rotate

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class rotate : MonoBehaviour
{
    // Start is called before the first frame update
    void Update()
    {
        transform.Rotate(0, 10, 0 * Time.deltaTime); //rotates 50 degrees per second around z axis
    }
}

----

# Ai Script 2 (Shark)

using UnityEngine;
using System.Collections;

public class sharkaiplay : MonoBehaviour
{

    public GameObject ThePlayer;
    public float TargetDistance;
    public float AllowedRange = 10;
    public GameObject TheEnemy;
    public float EnemySpeed;
    public int AttackTrigger;
    public RaycastHit Shot;

    public int IsAttacking;
    public GameObject ScreenFlash;
    public AudioSource Hurt01;
    public AudioSource Hurt02;
    public AudioSource Hurt03;
    public int PainSound;

    void Update()
    {
        transform.LookAt(ThePlayer.transform);
        if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), out Shot))
        {
            TargetDistance = Shot.distance;
            if (TargetDistance < AllowedRange)
            {
                EnemySpeed = 0.01f;
                if (AttackTrigger == 0)
                {
                    TheEnemy.GetComponent<Animation>().Play("SharkWalking");
                    transform.position = Vector3.MoveTowards(transform.position, ThePlayer.transform.position, EnemySpeed);
                }
            }
            else
            {
                EnemySpeed = 0;
                TheEnemy.GetComponent<Animation>().Play("SharkIdle");
            }
        }

        if (AttackTrigger == 1)
        {
            if (IsAttacking == 0)
            {
                StartCoroutine(EnemyDamage());
            }
            EnemySpeed = 0;
            TheEnemy.GetComponent<Animation>().Play("SharkAttacking");
        }
    }

    void OnTriggerEnter()
    {
        AttackTrigger = 1;
    }

    void OnTriggerExit()
    {
        AttackTrigger = 0;
    }


    IEnumerator EnemyDamage()
    {
        IsAttacking = 1;
        PainSound = Random.Range(1, 4);
        yield return new WaitForSeconds(0.1f);
        ScreenFlash.SetActive(true);
        GlobalHealth.PlayerHealth -= 1;
        print("minusone");
        if (PainSound == 1)
        {
            Hurt01.Play();
        }
        if (PainSound == 2)
        {
            Hurt02.Play();
        }
        if (PainSound == 3)
        {
            Hurt03.Play();
        }
        yield return new WaitForSeconds(2.5f);
        ScreenFlash.SetActive(false);
        yield return new WaitForSeconds(1);
        IsAttacking = 0;

    }



}

----

# Spawn Fractured Object

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class spawnfracturedobject : MonoBehaviour
{
    public GameObject originalObject;
    public GameObject fracturedObject;


    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            SpawnFracturedObject();
        }
    }
    public void SpawnFracturedObject()
    {
        Destroy(originalObject);
        GameObject fractObj = Instantiate(fracturedObject) as GameObject;
        fractObj.GetComponent<explode>().Explode();


    }

}

----

# Ai Script 3 (Spiders)

using UnityEngine;
using System.Collections;

public class spiderai : MonoBehaviour
{

    public GameObject ThePlayer;
    public float TargetDistance;
    public float AllowedRange = 10;
    public GameObject TheEnemy;
    public float EnemySpeed;
    public int AttackTrigger;
    public RaycastHit Shot;

    public int IsAttacking;
    public GameObject ScreenFlash;
    public AudioSource Hurt01;
    public AudioSource Hurt02;
    public AudioSource Hurt03;
    public int PainSound;

    void Update()
    {
        transform.LookAt(ThePlayer.transform);
        if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), out Shot))
        {
            TargetDistance = Shot.distance;
            if (TargetDistance < AllowedRange)
            {
                EnemySpeed = 0.01f;
                if (AttackTrigger == 0)
                {
                    TheEnemy.GetComponent<Animation>().Play("SpiderWalking");
                    transform.position = Vector3.MoveTowards(transform.position, ThePlayer.transform.position, EnemySpeed);
                }
            }
            else
            {
                EnemySpeed = 0;
                TheEnemy.GetComponent<Animation>().Play("SpiderIdle");
            }
        }

        if (AttackTrigger == 1)
        {
            if (IsAttacking == 0)
            {
                StartCoroutine(EnemyDamage());
            }
            EnemySpeed = 0;
            TheEnemy.GetComponent<Animation>().Play("SpiderAttacking");
        }
    }

    void OnTriggerEnter()
    {
        AttackTrigger = 1;
    }

    void OnTriggerExit()
    {
        AttackTrigger = 0;
    }


    IEnumerator EnemyDamage()
    {
        IsAttacking = 1;
        PainSound = Random.Range(1, 4);
        yield return new WaitForSeconds(0.1f);
        ScreenFlash.SetActive(true);
        GlobalHealth.PlayerHealth -= 1;
        print("minusone");
        if (PainSound == 1)
        {
            Hurt01.Play();
        }
        if (PainSound == 2)
        {
            Hurt02.Play();
        }
        if (PainSound == 3)
        {
            Hurt03.Play();
        }
        yield return new WaitForSeconds(2.5f);
        ScreenFlash.SetActive(false);
        yield return new WaitForSeconds(1);
        IsAttacking = 0;

    }



}

----

# Spin

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class spin : MonoBehaviour {

	public float speed = 9000f;
	void Update () {
		transform.Rotate (Vector3.left, speed * Time.deltaTime);
	}
}

----

# Spin Sphere

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class spinsphere : MonoBehaviour {

	public float speed = 100f;
	void Update () {
		transform.Rotate (Vector3.right, speed * Time.deltaTime);
	}
}

---

# Splash Sequence VR

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SplashSequence : MonoBehaviour {

	public static int SceneNumber;
	// Use this for initialization
	void Start () {
		if (SceneNumber == 0) {
			StartCoroutine (ToSplashTwo());
	}
		if (SceneNumber == 1) {
			StartCoroutine (ToMainMenu ());
		}

	}
	IEnumerator ToSplashTwo () {
		yield return new WaitForSeconds (5);
		SceneNumber = 1;
		SceneManager.LoadScene (1);
	}
	IEnumerator ToMainMenu () {
		yield return new WaitForSeconds (5);
		SceneNumber = 2;
			SceneManager.LoadScene (2);
}
}

----

# Spawn Over Time

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class timespawn : MonoBehaviour
{

    public GameObject spawnee;
    public bool stopSpawning = false;
    public float spawnTime;
    public float spawnDelay;

    // Use this for initialization
    void Start()
    {
        InvokeRepeating("SpawnObject", spawnTime, spawnDelay);
    }

    public void SpawnObject()
    {
        Instantiate(spawnee, transform.position, transform.rotation);
        if (stopSpawning)
        {
            CancelInvoke("SpawnObject");
        }
    }
}

----

# Target Next Scene

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
//nickyougotthisbuddy
public class tutorialtargetnextscene : MonoBehaviour
{
   public int life = 0;

    //public void OnCollisionEnter(Collision boom)
    // {
    //If the object that triggered this collision is tagged "bullet"
    // if (gameObject.tag == "bullet")
    //  {
    //     life += 1;
    //    print("hit");
    //   if (life >= 3)
    // gameObject.GetComponent<Animator>().enabled = false;
    //     Destroy(gameObject);
    // }
    //}
    //}
    void OnCollisionEnter(Collision collision)
    {
        if (collision.collider.gameObject.tag == "bullet")
        {
            life += 1;
               print("hitexit");
            if (life >= 3)
                // Destroy(gameObject);
                //gameObject.SetActive(false);
                SceneManager.LoadSceneAsync("level2");
            //SetKinematic(false);
            //GetComponent<Animator>().enabled = false;
        }
    }
}

----

# Wait (Coroutine)

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class wait : MonoBehaviour
{
    public bool Hide = false;


    void Update()
    {
        if (Hide
            && GetComponent<Renderer>().enabled)
        {
            GetComponent<Renderer>().enabled = false;
            Hide = false;
            StartCoroutine("WaitUnhide");
        }
    }


    IEnumerator WaitUnhide()
    {
        yield return (new WaitForSeconds(30));
        GetComponent<Renderer>().enabled = true;
    }
}

----

<p class="text-center">
{% include elements/button.html link="https://nicholasjonathan.com/projects/" text="Previous Page" %}
